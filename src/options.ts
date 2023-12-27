interface OptionsModuleFlags {
  url: string;
  appName?: string;
  environment?: string;
  instanceId?: string;
  ipHeader?: string; //Header to extract IP. 'x-forwarded-for' default
  show?: {
    description?: boolean;
    strategies?: boolean;
    paramsStrategies?: boolean;
  }
}

const defaultOptions: Partial<OptionsModuleFlags> = {
  show: {
    description: true,
    strategies: true,
    paramsStrategies: true,
  },
  ipHeader: 'x-forwarded-for'
}

export {
  OptionsModuleFlags,
  defaultOptions
};

