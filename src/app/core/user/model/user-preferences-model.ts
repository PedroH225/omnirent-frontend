import { Locale } from "@core/i18n/locale.service";

export interface UserPreferences {
    locale: Locale | null,
    timezone: string | null,
}