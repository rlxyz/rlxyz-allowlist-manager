import {
  Client,
  Intents,
  MessageActionRow,
  MessageButton,
  TextChannel,
} from "discord.js";

const AllowlistButton = new MessageButton()
  .setCustomId("allowlist")
  .setLabel("Allowlist")
  .setStyle("PRIMARY");

export class Discord {
  client: Client;

  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  }

  async Connect(channelId: string): Promise<TextChannel> {
    return new Promise<TextChannel>((resolve, reject) => {
      if (!process.env["DISCORD_BOT_TOKEN"])
        reject("DISCORD_BOT_TOKEN not set");

      this.client.login(process.env.DISCORD_BOT_TOKEN);

      this.client.on("ready", async () => {
        const channel = await this.client.channels.fetch(channelId!);
        resolve(channel as TextChannel);
      });

      this.client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;

        const row = new MessageActionRow().addComponents(AllowlistButton);

        await interaction.reply({ content: "Pong!", components: [row] });
      });
    });
  }
}
