import {FeatureInterface, StrategyTransportInterface} from "./types";
import {blue, bold, gray, green, red, whiteBright, yellow, yellowBright} from "colorette";
import {OptionsModuleFlags} from "./options";

const printableStrategy = (strategy: StrategyTransportInterface, maxLengthName: number, isLast: boolean, config: OptionsModuleFlags): string|null => {
    const MAX_SIZE_PARAMS = 64;
    if (strategy.name === 'default' || !config.show?.strategies) {
        return null;
    }

    const name = (isLast ? "└ " : "├ ") + strategy.name.padEnd(maxLengthName, ' ')
    if (!config.show.paramsStrategies) {
        return "\n" + `  ${yellowBright(name)}`;
    }

    let params: string = JSON.stringify(strategy.parameters);
    params = params.length <= MAX_SIZE_PARAMS ? params : params.substring(0, MAX_SIZE_PARAMS) + "...";
    return "\n" + `  ${yellowBright(name)} → ${yellow(params)}`;
}

const printableStrategies = (strategy: StrategyTransportInterface[], config: OptionsModuleFlags): string => {
    const maxLengthName: number = Math.max(...strategy.map(({name}) => name.length))
    return strategy.map((s: StrategyTransportInterface, idx: number) => printableStrategy(s, maxLengthName, idx === strategy.length - 1, config)).join('');
}

const printableFeature = (feature: FeatureInterface, maxLengthName: number, config: OptionsModuleFlags,): string => {
    let msg: string = `${blue(bold(feature.name.padEnd(maxLengthName, ' ')))} `;
    msg += feature.enabled ? green(`⏻ enabled `) : red('⏼ disabled');
    if (config.show?.description) {
        msg += gray(" (" + feature.description + ")");
    }
    msg += printableStrategies(feature.strategies, config)
    return msg;
}

const printTitle = (config: OptionsModuleFlags): string => {
    const title = whiteBright('Feature flags');
    const subtitle = gray("Environment: " + (config.environment || config.appName));
    return title+ "\n" + subtitle;
}


const printableFeatures = (features: FeatureInterface[], config: OptionsModuleFlags): string => {
    if (features.length === 0) {
        return `There are no \`feature flags\``
    }
    const maxLengthName: number = Math.max(...features.map(({name}) => name.length))
    const title = printTitle(config) + "\n\n";
    return title + features.map((f: FeatureInterface) => printableFeature(f, maxLengthName, config)).join('\n');
}

export {
    printableFeatures
}
