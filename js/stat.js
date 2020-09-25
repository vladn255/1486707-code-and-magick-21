'use strict';

const CLOUD_WIDTH = 400;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const SHIFT = 10;
const COLUMN_GAP = 50;
const COLUMN_HEIGHT = 150;
const COLUMN_WIDTH = 40;
const SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const CLOUD_COLOR = `#fff`;
const TEXT_COLOR = `#000`;
const PLAYER_COLOR = `rgba(255, 0, 0, 1)`;


const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + SHIFT,
      CLOUD_Y + SHIFT,
      SHADOW_COLOR
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_COLOR
  );

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `16px PT Mono`;

  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + 3 * SHIFT,
      CLOUD_Y + 3 * SHIFT
  );

  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + 3 * SHIFT,
      CLOUD_Y + 3 * SHIFT + 16
  );

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {

    ctx.fillStyle = TEXT_COLOR;

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + 8 * SHIFT + (COLUMN_HEIGHT * (1 - times[i] / maxTime))
    );

    ctx.fillText(
        players[i],
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - SHIFT
    );

    ctx.fillStyle = (players[i] === `Вы`) ? PLAYER_COLOR : `hsl(240, ${Math.random() * 100}%, 50%)`;

    ctx.fillRect(
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + 9 * SHIFT + (COLUMN_HEIGHT * (1 - times[i] / maxTime)),
        COLUMN_WIDTH,
        COLUMN_HEIGHT * times[i] / maxTime - SHIFT
    );
  }
};
