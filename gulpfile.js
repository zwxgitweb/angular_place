/**
 * app api
 *  主入口文件
 * gulp服务接口
 */

// 引入gulp、webserver服务模块
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    url = require('url');

// 创建获取数据任务 | 接口8888
gulp.task('localhost', function () {
    gulp.src('.')
    .pipe(webserver({
        port: 8888,
        host: 'localhost',
        middleware: function (req, res, next) {
            let path = url.parse(req.url);
            let pathname = path.pathname;
            let params = pathname.split('/')[2];
            let method = req.method;
            if (req.url == '/favicon.ico') {
                return;
            }
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*'
            })
            // 判断请求方式
            if (method === 'GET') {
                // 判断接口参数
                if ( params == undefined) {
                    switch(pathname) {
                        case '/getdata':
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*'
                            })
                            res.end(require('fs').readFileSync('src/data/data.json'));
                        break;
                        case '/main':
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*'
                            })
                            res.end(require('fs').readFileSync('src/data/main.json'));
                        break;
                        case '/icon':
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*'
                            })
                            res.end(require('fs').readFileSync('src/data/icon.json'));
                        break;
                        case '/shop':
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*'
                            })
                            res.end(require('fs').readFileSync('src/data/shop.json'));
                        break;
                        case '/food':
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*'
                            })
                            res.end(require('fs').readFileSync('src/data/food.json'));
                        break;
                        case '/place':
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*'
                            })
                            res.end(require('fs').readFileSync('src/data/place.json'));
                        break;
                        default : res.end('not fonnd this page');
                        break;
                    }
                } else {
                    var file = require('fs').readFileSync('src/data/child.json');
                    JSON.parse(file).map(function (item) {
                        if (params == item.id) {
                            res.end(JSON.stringify(item));
                        }
                    })
                } 
            } else if (method === 'POST') {
                let str = '';
                req.on('data', function (chunk) {
                    str += chunk;
                })
                req.on('end', function () {
                    if (str == '{}') {
                        res.writeHead(200, {
                            "content-type": "text/json;charset=utf-8"
                        });
                        res.end('0');
                    } else {
                        res.writeHead(200, {
                            'content-type': 'text/json;charset=utf-8'
                        });
                        res.end(JSON.stringify(str));
                    }
                })
            }
        }
    }))
})

// 创建启动页面任务 | 接口8080
gulp.task('server', function () {
    gulp.src('.')
    .pipe(webserver({
        port: 8080,
        host: 'localhost',
        open: true
    }))
})

// 默认执行任务
gulp.task('default', ['localhost', 'server']);