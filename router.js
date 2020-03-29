'use strict'

var core = require('../core')
var { router } = core
var speedtest_ctrl = require('./controllers/speedtest_ctrl')

router.get('/speedtest-plugin', speedtest_ctrl.get)
router.post('/speedtest-plugin/start', speedtest_ctrl.start)

module.exports = router
