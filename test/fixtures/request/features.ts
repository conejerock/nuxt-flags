import {FeatureInterface} from "unleash-client/lib/feature";

export default [
    {
        "name": "feature-name-1",
        "description": "This is Feature Name 1 description",
        "enabled": false,
        "strategies": [
            {
                "name": "default",
                "parameters": {}
            }
        ]
    }
] as FeatureInterface[]
