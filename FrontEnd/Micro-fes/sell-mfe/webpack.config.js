const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: 'http://localhost:3000/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'sell_mfe',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Counter': './src/Counter.jsx',
        './FeaturedVehicles': './src/components/FeaturedVehicles.jsx',
        './Navbar': './src/components/Navbar.jsx',
        './Footer': './src/components/Footer.jsx',
        './VehicleCards': './src/components/VehicleCards.jsx',
        './SellCarForm': './src/components/SellCarForm.jsx',
        './VehicleDetailsCard': './src/components/VehicleDetailsCard.jsx',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
});
