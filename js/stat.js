'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING_TOP = 10;
var CLOUD_PADDING_BOTTOM = 10;
var CLOUD_PADDING_LEFT = 40;
var CLOUD_COORDINATES = [100, 10];
var CLOUD_SHADOW_OFFSET = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;

var getMaxElement = function (elements) {
  return Math.max(...elements);
};

var getBarHeight = function (maxResult, currentResult) {
  return BAR_MAX_HEIGHT * currentResult / maxResult;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = CLOUD_SHADOW_OFFSET;
  ctx.shadowOffsetY = CLOUD_SHADOW_OFFSET;
  ctx.fillStyle = '#fff';
  ctx.fillRect(CLOUD_COORDINATES[0], CLOUD_COORDINATES[1], CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.restore();
  ctx.fillStyle = '#000';

  var barHeight;
  var maxTime = getMaxElement(times);

  for (var index = 0; index < names.length; index++) {
    ctx.save();
    if (names[index] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toFixed(1) + ')';
    }
    barHeight = Math.round(getBarHeight(maxTime, times[index]));
    ctx.fillRect(CLOUD_COORDINATES[0] + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_INTERVAL) * index, CLOUD_HEIGHT - 30, BAR_WIDTH, -barHeight);
    ctx.restore();
    ctx.fillText(names[index], CLOUD_COORDINATES[0] + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_INTERVAL) * index, CLOUD_HEIGHT - 10);
  }
};
