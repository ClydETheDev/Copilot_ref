import { langTypes } from "@services/i18n";
import { Copy } from "../Utils";

const UserSchema = {
	ducks: 0
} satisfies UserSchema;

const GuildSchema = {} satisfies GuildSchema;

interface UserSchema {
	ducks: number;
}

interface GuildSchema {}

export { UserSchema, GuildSchema };
