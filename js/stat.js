'use strict';

const CLOUD_WIDTH = 500;
const CLOUD_HEIGHT = 200;
const CLOUD_X = 100;
const CLOUD_Y = 50;
const GAP = 10;
const COLUMN_GAP = 50;
const COLUMN_HEIGHT = 150;
const COLUMN_WIDTH = 40;


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
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    let playerColor = function () {
      if (players[i] === `Вы`) {
        return `hsl(0, 100%, 50%)`;
      } else {
        return `hsl(240, ${Math.random() * 100}%, 50%)`;
      }
    };

    ctx.fillStyle = `#000`;

    ctx.fillText(
        players[i],
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + 2 * GAP + (COLUMN_HEIGHT * (1 - times[i] / maxTime))
    );

    ctx.fillStyle = playerColor();
    ctx.fillRect(
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + 3 * GAP + (COLUMN_HEIGHT * (1 - times[i] / maxTime)),
        COLUMN_WIDTH,
        (COLUMN_HEIGHT * times[i]) / maxTime - GAP
    );

  }
};
