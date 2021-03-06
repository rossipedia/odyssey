"use strict";

var assert = require('assert');
var odyssey = require('../');

var athena = odyssey.athena;
var httpLog = odyssey.httpLog;

suite('Map', function ()
{
	test('Sync Example', function (done)
	{
		athena.map
		(
			{ 0: 'one', 1: 'two', 2: 'three'},
			function(cb, item, index)
			{
				cb(null, 'Hey ' + index + ' ' + item);
			},
			function (hlog, results)
			{
				assert(!hlog.failed);
				assert(results[1] === 'Hey 1 two');

				done();
			}
		);
	});
	
	test('Async Example', function (done)
	{
		athena.map
		(
			[ 'one', 'two', 'three'],
			function(cb, item, index)
			{
				process.nextTick(function () { cb(null, 'Hey ' + index + ' ' + item); });
			},
			function (hlog, results)
			{
				assert(!hlog.failed);
				assert(results[1] === 'Hey 1 two');

				done();
			}
		);
	});
});