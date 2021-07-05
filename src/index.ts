import webpack from 'webpack';
import Builder from './builder';
import Config from './config';
import Server from './server';
import { postMessage, BuilderType } from './util';
export interface BaseConfig {
    [propName: string]: any;
}

function builderWebpack(cmd: string) {
    const builderOptions = Config.getBuildConfig(cmd);
    const devConfig: BaseConfig = Builder.createDevConfig(builderOptions);
    const prodConfig: BaseConfig = Builder.createProdConfig(builderOptions);
    if (cmd === 'dev') {
        Server(devConfig);
    } else if (cmd === 'build') {
        webpack(prodConfig, (err: any, stats: any) => {
            if (err) {
                console.log(err);
                postMessage.error(BuilderType.build, err);
                process.exit(2);
            }

            postMessage.success(BuilderType.build);

            console.log(
                stats &&
                    stats.toString({
                        chunks: false,
                        colors: true,
                        children: false,
                    })
            );
        });
    }
}
export default builderWebpack;
module.exports = exports.default;
