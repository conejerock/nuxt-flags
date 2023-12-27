import type {OptionsModuleFlags} from "./options";
import {logger} from "@nuxt/kit";
import {red} from "colorette";

const validateOptions = (options: Partial<OptionsModuleFlags>): void => {
  if (options.url == null) {
    const message = `${red('[Nuxt Flags]')} URL feature flags cannot be empty (\`flags.url\` in \`./nuxt.config.ts\`)`
    logger.error(message);
    throw new Error(message)
  }
  if (options.appName == null && options.environment == null) {
    const message = `${red('[Nuxt Flags]')} appName or environment feature flags cannot be empty (\`flags.(appName/environment))\` in \`./nuxt.config.ts\`)`
    logger.error(message);
    throw new Error(message)
  }
}

export {
  validateOptions
}
