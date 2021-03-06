const fs = require('fs');

// 1、创建promise对象，一经创建，立马执行
// new Promise((resolve, reject) => {
//     fs.readFile(__dirname + '/data/a.txt', (err, data) => {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(data);
//         }
//     });
// }).then((data) => {
//     console.log(data.toString());
//     return new Promise((resolve, reject) => {
//         fs.readFile(__dirname + '/data/b.txt', (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }).then((data) => {
//     console.log(data.toString());
//     return new Promise((resolve, reject) => {
//         fs.readFile(__dirname + '/data/c.txt', (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }).then((data) => {
//     console.log(data.toString());
// });

readFile(__dirname + '/data/a.txt', 'utf8')
    .then((data) => {
        console.log(data);
        return readFile(__dirname + '/data/b.txt', 'utf8');
    })
    .then((data) => {
        console.log(data);
        return readFile(__dirname + '/data/c.txt', 'utf8');
    })
    .then((data) => {
        console.log(data);
        return readFile(__dirname + '/data/a.txt', 'utf8');
    })
    .then((data)=>{
        console.log(data);
    });

function readFile(...args) {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}