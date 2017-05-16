// Karma configuration
'use strict';

module.exports = function (config) {
    let customBrowsers = ['Remote-IE10', 'Remote-Chrome56', 'Remote-Firefox46'];
    let userConfig = require('./userConfig.js'),
        os          = require('os'),
        hostname    = os.hostname();

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        hostname : hostname,
        customLaunchers: {
            'Remote-IE10': {
                base: 'WebdriverIO',
                config: {
                    host: 'hub.crossbrowsertesting.com',
                    port: 80,
                    user: userConfig.userName,
                    key: userConfig.authKey,
                    desiredCapabilities: {
                        name: 'Karma Unit Testing',
                        build: '1.0',
                        browserName: 'internet explorer',
                        browser_api_name: 'IE10',
                        os_api_name: 'Win7x64-C2',
                        record_video: 'true',
                        record_network: 'true'
                    }
                }
            },
            'Remote-Chrome56': {
                base: 'WebdriverIO',
                config: {
                    host: 'hub.crossbrowsertesting.com',
                    port: 80,
                    user: userConfig.userName,
                    key: userConfig.authKey,
                    desiredCapabilities: {
                        name: 'Karma Unit Testing',
                        build: '1.0',
                        browserName: 'chrome',
                        browser_api_name: 'Chrome56x64',
                        os_api_name: 'Win7x64-C1',
                        record_video: 'true',
                        record_network: 'true'
                    }
                }
            },
            'Remote-Firefox46': {
                base: 'WebdriverIO',
                config: {
                    host: 'hub.crossbrowsertesting.com',
                    port: 80,
                    user: userConfig.userName,
                    key: userConfig.authKey,
                    desiredCapabilities: {
                        name: 'Karma Unit Testing',
                        build: '1.0',
                        browserName: 'firefox',
                        browser_api_name: 'FF46x64',
                        os_api_name: 'Win7x64-C1',
                        record_video: 'true',
                        record_network: 'true'
                    }
                }
            }
        },

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai', 'browserify'],

        // list of files / patterns to load in the browser
        files: [
            '../src/**/*.js',
            'javascript/**/*.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'javascript/**/*.spec.js': ['browserify']
        },

        // Browserify configuration
        // The coverage command goes here instead of the preprocessor because we need it to work with browserify
        browserify: {
            debug: true,
            transform: [
                [
                    'babelify',
                    {
                        presets: 'es2015'
                    }
                ], [
                    'browserify-istanbul',
                    {
                        instrumenterConfig: {
                            embedSource: true
                        }
                    }
                ]
            ]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // coverage is from karma-coverage and provides Istanbul code coverage reports
        reporters: ['mocha'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: customBrowsers,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};