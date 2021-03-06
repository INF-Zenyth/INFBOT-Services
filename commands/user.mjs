import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

import { config, formatFullDate, logEvent } from "../modules/modules.mjs";

/**
 * ! USER command
 * ! Gives the initial user relevant information about the target user
 */

export default {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Get user information")
        .addUserOption(option => option
            .setName("target")
            .setDescription("User you want information on")
            .setRequired(true))

    , async execute(interaction) {
        
        const user = interaction.options.getUser("target");
        const member = await interaction.guild.members.cache.get(user.id);
        const embed = new MessageEmbed()
            .setColor(config.COLOR.EVENT)
            .setThumbnail(user.avatarURL())
            .setTitle("User Information:")
            .setDescription("Here's some information about this user")
            .addFields(
                { name: "Username:", value: `${user.tag}`},
                { name: "Nickname:", value: `${member.nickname ? member.nickname : "None"}`},
                { name: "ID:", value: `${user.id}` },
                { name: "Joined this server:", value: `${formatFullDate(member.joinedAt)}` },
                { name: "Joined Discord:", value: `${formatFullDate(user.createdAt)}` }
            );
        await interaction.reply({ embeds: [embed] });
        logEvent(interaction.commandName);
        return;
    }
}