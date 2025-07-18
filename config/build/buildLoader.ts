import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import buildBabelLoader from './babel/buildBabelLoader';

export function buildLoader(env: BuildOptions): ModuleOptions['rules'] {
  const isDev: boolean = env.mode !== 'production';

  const babelLoader = buildBabelLoader(env);

  const cssModulesLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev
          ? '[folder]-[local]--[hash:base64:8]'
          : '[hash:base64:8]',
      },
      importLoaders: 1,
    },
  };

  const scssLoader = {
    test: /\.((c|sa|sc)ss)$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssModulesLoader,
      'sass-loader',
    ],
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: false,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  return [scssLoader, babelLoader, assetLoader, svgrLoader, fontLoader];
}
