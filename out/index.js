"use strict";
var imaps = require('imap-simple');
// const simpleParser = require('mailparser').simpleParser;
var _ = require('lodash');
var config = {
    imap: {
        user: 'amosokello04@gmail.com',
        password: 'cvvxnbfkmoxpjlrl',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};
imaps.connect(config).then(function (connection) {
    return connection.openBox('INBOX').then(function () {
        var searchCriteria = ['1:5'];
        var fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
        };
        return connection.search(searchCriteria, fetchOptions).then(function (messages) {
            messages.forEach(function (item) {
                var all = _.find(item.parts, { "which": "TEXT" });
                var html = (Buffer.from(all.body, 'base64').toString('ascii'));
                console.log(html);
            });
        });
    });
});
