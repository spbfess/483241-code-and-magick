'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING_TOP = 10;
var CLOUD_PADDING_BOTTOM = 10;
var CLOUD_PADDING_LEFT = 50;
var CLOUD_COORDINATES = [100, 10];
var CLOUD_SHADOW_OFFSET = 10;
var CLOUD_SLOPE_OFFSET = 5;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;
var RESULTS_MESSAGE = 'Ура вы победили!\nСписок результатов:';

var getMaxElement = function (elements) {
  return Math.max(...elements);
};

var getBarHeight = function (maxResult, currentResult) {
  return BAR_MAX_HEIGHT * currentResult / maxResult;
};

var renderCloud = function (ctx) {
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = CLOUD_SHADOW_OFFSET;
  ctx.shadowOffsetY = CLOUD_SHADOW_OFFSET;
  ctx.beginPath();
  ctx.moveTo(CLOUD_COORDINATES[0], CLOUD_COORDINATES[1]); // start
  ctx.lineTo(CLOUD_COORDINATES[0] + CLOUD_WIDTH / 2, CLOUD_COORDINATES[1] + CLOUD_SLOPE_OFFSET); // halfway to top right
  ctx.lineTo(CLOUD_COORDINATES[0] + CLOUD_WIDTH, CLOUD_COORDINATES[1]); // top right
  ctx.lineTo(CLOUD_COORDINATES[0] + CLOUD_WIDTH - CLOUD_SLOPE_OFFSET, CLOUD_COORDINATES[1] + CLOUD_HEIGHT / 2); // halfway to bottom right
  ctx.lineTo(CLOUD_COORDINATES[0] + CLOUD_WIDTH, CLOUD_COORDINATES[1] + CLOUD_HEIGHT); // bottom right
  ctx.lineTo(CLOUD_COORDINATES[0] + CLOUD_WIDTH / 2, CLOUD_COORDINATES[1] + CLOUD_HEIGHT - CLOUD_SLOPE_OFFSET); // halfway to bottom left
  ctx.lineTo(CLOUD_COORDINATES[0], CLOUD_COORDINATES[1] + CLOUD_HEIGHT); // bottom left
  ctx.lineTo(CLOUD_COORDINATES[0] + CLOUD_SLOPE_OFFSET, CLOUD_COORDINATES[1] + CLOUD_HEIGHT / 2); // halfway to top left
  ctx.closePath();
  ctx.strokeStyle = '#000';
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);

  var barHeight;
  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  for (var index = 0; index < names.length; index++) {
    ctx.save();
    if (names[index] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
    }
    barHeight = Math.round(getBarHeight(maxTime, times[index]));
    ctx.fillRect(CLOUD_COORDINATES[0] + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_INTERVAL) * index, CLOUD_HEIGHT - 30, BAR_WIDTH, -barHeight);
    ctx.restore();
    ctx.fillText(names[index], CLOUD_COORDINATES[0] + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_INTERVAL) * index, CLOUD_HEIGHT - 10);
  }
};
