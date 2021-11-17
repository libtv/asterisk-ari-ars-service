import ari from "ari-client";
import { EventEmitter } from "events";

class ARSapp extends EventEmitter {
    constructor() {
        super();
        this.timers = {};
        this.dtmf = {};
    }

    connect() {
        let func = this.clientLoaded.bind(this);
        ari.connect("http://localhost:8088", "asterisk", "asterisk", func);
    }

    clientLoaded(err, client) {
        if (err) {
            throw err;
        }

        client.on("StasisStart", stasisStart);
        client.on("StasisEnd", stasisEnd);
        client.start("channel-state");

        var self = this;

        function stasisStart(event, channel) {
            console.log("Channel %s has entered the application", channel.name);
            channel.on("ChannelDtmfReceived", dtmfReceived);
            channel.answer(function (err) {
                if (err) {
                    throw err;
                }
                playIntroMenu(channel);
            });
        }

        function stasisEnd(event, channel) {
            console.log("Channel %s has left the application", channel.name);
            channel.removeListener("ChannelDtmfReceived", dtmfReceived);
            cancelTimeout(channel);
        }

        function dtmfReceived(event, channel) {
            self.dtmf[channel.id] === undefined ? (self.dtmf[channel.id] = "") : null;
            self.dtmf[channel.id] += event.digit;

            if (self.dtmf[channel.id].length === 4) {
                const data = {
                    dtmf: self.dtmf[channel.id],
                    channel: channel.name,
                };
                self.emit("success", data);

                cancelTimeout(channel);
                channel.hangup(function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }

        function playIntroMenu(channel) {
            var state = {
                currentSound: "sound:hello-world",
                currentPlayback: undefined,
                done: false,
            };

            queueUpSound();

            function queueUpSound() {
                if (!state.done) {
                    if (!state.currentSound) {
                        var timer = setTimeout(stillThere, 10 * 1000);
                        self.timers[channel.id] = timer;
                    } else {
                        var playback = client.Playback();
                        state.currentPlayback = playback;

                        channel.play({ media: state.currentSound }, playback, function (err) {});

                        state.currentSound = null;
                        queueUpSound();
                    }
                }
            }

            function stillThere() {
                console.log("Channel %s stopped paying attention...", channel.name);

                channel.play({ media: "sound:are-you-still-there" }, function (err) {
                    if (err) {
                        throw err;
                    }

                    playIntroMenu(channel);
                });
            }
        }

        function cancelTimeout(channel) {
            var timer = self.timers[channel.id];
            var dtmf = self.dtmf[channel.id];

            if (timer) {
                clearTimeout(timer);
                delete self.timers[channel.id];
            }

            if (dtmf) {
                delete self.dtmf[channel.id];
            }
        }
    }
}

export default ARSapp;
