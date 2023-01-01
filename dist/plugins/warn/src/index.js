"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const gets_1 = require("../../../services/gets");
const roles = [
    "805114001742757890",
    "823885219257778188",
    "792978871175479337"
];
const channelId = "861851808804110346";
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "warn",
        desc: "Warn a people",
        handler: async (msg) => {
            if (!msg.member?.permissions.has("ManageGuild"))
                return msg.reply("0: no perms");
            const args = ap.modern(msg.content);
            const user = await (0, gets_1.getUser)(msg, args[1]);
            if (!user)
                return msg.reply("0: usage is `f!warn <mention> [reason]`!");
            const member = await msg.guild?.members.fetch(user.id);
            if (!member)
                return msg.reply("0: this is either unexcepted or member is not in this server.");
            let lvl = 0;
            if (member.roles.cache.has(roles[0]))
                lvl = 1;
            if (member.roles.cache.has(roles[1]))
                lvl = 2;
            if (member.roles.cache.has(roles[2]))
                return msg.reply("User is already in thin ice!");
            if (lvl == 0) {
                member.roles.add(roles[0]);
                msg.reply(`Warned user \`${member.user.tag}\`${args[2] ? ` with the reason ${args[2]}` : ""}!\nthey are now on warn #1`);
            }
            else if (lvl == 1) {
                member.roles.remove(roles[0]).catch(e => e);
                member.roles.add(roles[1]).catch(e => e);
                if (!member.communicationDisabledUntil &&
                    !member.permissions.has("Administrator"))
                    member.timeout((0, ms_1.default)("1h"));
                msg.reply(`Warned user \`${member.user.tag}\`${args[2] ? ` with the reason ${args[2]}` : ""}!\ni have gave them 1h timeout, they are now on warn #2`);
            }
            else if (lvl == 2) {
                member.roles.remove(roles[1]).catch(e => e);
                member.roles.add(roles[2]).catch(e => e);
                if (!member.communicationDisabledUntil &&
                    !member.permissions.has("Administrator"))
                    member.timeout((0, ms_1.default)("1d"));
                msg.reply(`Warned user \`${member.user.tag}\`${args[2] ? ` with the reason ${args[2]}` : ""}!\ni have gave them 1d timeout, they are now on warn #3`);
            }
            const logChannel = client.channels.cache.get(channelId);
            if (logChannel?.isTextBased())
                logChannel.send(`\`${msg.author.tag}\` (${msg.author.id}) warned \`${member.user.tag}\`${args[2]
                    ? ` with the reason ${args[2]}`
                    : " with no reason"}! this is their warn #${lvl + 1}`);
        }
    });
}
module.exports = load;
function IsJsonString(str) {
    let o;
    try {
        o = JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    if (o && typeof o === "object")
        return true;
    return false;
}
function percentage(pv, tv) {
    return Math.round((pv / tv) * 100);
}
//# sourceMappingURL=index.js.map