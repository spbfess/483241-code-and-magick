'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING_TOP = 15;
var CLOUD_PADDING_BOTTOM = 30;
var CLOUD_PADDING_LEFT = 55;
var CLOUD_COORDINATES = [100, 10];
var CLOUD_SHADOW_OFFSET = 10;
var CLOUD_SLOPE_OFFSET = 5;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;
var RESULTS_MESSAGE = 'Ура вы победили!\nСписок результатов:';
var RESULTS_FONT = '16px PT Mono';
var RESULTS_FONT_OFFSET = 20;
var CAPTION_FONT = '14px PT Mono';
var CAPTION_FONT_OFFSET = 5;

var getMaxElement = function (elements) {
  return Math.max.apply(null, elements);
};

var getBarHeight = function (maxResult, currentResult) {
  return BAR_MAX_HEIGHT * currentResult / maxResult;
};

var renderCloud = function (ctx, points) {
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = CLOUD_SHADOW_OFFSET;
  ctx.shadowOffsetY = CLOUD_SHADOW_OFFSET;
  ctx.beginPath();

  for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
    if (pointIndex === 0) {
      ctx.moveTo(points[pointIndex][0], points[pointIndex][1]);
    } else {
      ctx.lineTo(points[pointIndex][0], points[pointIndex][1]);
    }
  }

  ctx.closePath();
  ctx.strokeStyle = '#000';
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();
};

window.renderStatistics = function (ctx, names, times) {
  var cloudPoints = [
    [CLOUD_COORDINATES[0], CLOUD_COORDINATES[1]],
    [CLOUD_COORDINATES[0] + CLOUD_WIDTH / 2, CLOUD_COORDINATES[1] + CLOUD_SLOPE_OFFSET],
    [CLOUD_COORDINATES[0] + CLOUD_WIDTH, CLOUD_COORDINATES[1]],
    [CLOUD_COORDINATES[0] + CLOUD_WIDTH - CLOUD_SLOPE_OFFSET, CLOUD_COORDINATES[1] + CLOUD_HEIGHT / 2],
    [CLOUD_COORDINATES[0] + CLOUD_WIDTH, CLOUD_COORDINATES[1] + CLOUD_HEIGHT],
    [CLOUD_COORDINATES[0] + CLOUD_WIDTH / 2, CLOUD_COORDINATES[1] + CLOUD_HEIGHT - CLOUD_SLOPE_OFFSET],
    [CLOUD_COORDINATES[0], CLOUD_COORDINATES[1] + CLOUD_HEIGHT],
    [CLOUD_COORDINATES[0] + CLOUD_SLOPE_OFFSET, CLOUD_COORDINATES[1] + CLOUD_HEIGHT / 2]
  ];
  var lines = RESULTS_MESSAGE.split('\n');

  renderCloud(ctx, cloudPoints);
  ctx.font = RESULTS_FONT;
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'top';

  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    ctx.fillText(lines[lineNumber], CLOUD_COORDINATES[0] + CLOUD_PADDING_LEFT, CLOUD_COORDINATES[1] + CLOUD_PADDING_TOP + RESULTS_FONT_OFFSET * lineNumber);
  }

  var barHeight;
  var barTopY;
  var barLeftX;
  var barBottomY = CLOUD_COORDINATES[1] + CLOUD_HEIGHT - CLOUD_PADDING_BOTTOM;
  var maxTime = getMaxElement(times);

  ctx.font = CAPTION_FONT;

  for (var index = 0; index < names.length; index++) {
    barLeftX = CLOUD_COORDINATES[0] + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_INTERVAL) * index;
    barHeight = Math.round(getBarHeight(maxTime, times[index]));
    barTopY = barBottomY - barHeight;
    ctx.save();

    if (names[index] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
    }

    ctx.fillRect(barLeftX, barBottomY, BAR_WIDTH, -barHeight);
    ctx.restore();
    ctx.textBaseline = 'bottom';
    ctx.fillText(Math.round(times[index]), barLeftX, barTopY - CAPTION_FONT_OFFSET);
    ctx.textBaseline = 'top';
    ctx.fillText(names[index], barLeftX, barBottomY + CAPTION_FONT_OFFSET);
  }
};
