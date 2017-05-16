'use strict';

let gulp   = require('gulp'),
    Server = require('karma').Server,
    cbt    = require('cbt_tunnels'),
    request = require('request'),
    userConfig = require('./test/userConfig.js');

/**
 * Run test once and exit
 */
gulp.task('test', ['startTunnel'], function (done) {
    new Server({
        configFile: __dirname + '/test/karma.conf.js'
    }, function(results){
        if (results === 1) {
            done('karma: tests failed with code ' + results);
        } else {
            done();
        }
    }).start();
});

gulp.task('startTunnel', function (done) {
    let getOptions = {
        url: 'http://crossbrowsertesting.com/api/v3/tunnels?active=true',
        method: 'GET',
        headers: {
            authorization: 'authorized '+ (new Buffer(userConfig.userName+':'+userConfig.authKey)).toString('base64')
        }
    };

    request(getOptions, function(err, res, body) {
        let json = JSON.parse(body);
        if(json.meta.record_count <= 0) {
            cbt.start({ 'username' : userConfig.userName, 'authkey' : userConfig.authKey }, function(){
                done();
            });
        } else {
            done();
        }
    });
});

gulp.task('stopTunnel', ['test'], function (done) {
    cbt.stop();
    done();
});


gulp.task('default', ['startTunnel', 'test', 'stopTunnel']);