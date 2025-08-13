export const degreesToRads = (d) => d * 0.01745;

export const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function circleRectCollision(cx, cy, radius, rx, ry, rw, rh) {
    let cx2 = cx;
    let cy2 = cy;
    if (cx < rx) { cx2 = rx } else if (cx > rx + rw) { cx2 = rx + rw };
    if (cy < ry) { cy2 = ry; } else if (cy > ry + rh) { cy2 = ry + rh };

    let distX = cx - cx2;
    let distY = cy - cy2;
    let distance = Math.sqrt((distX * distX) + (distY * distY));

    if (distance <= radius) {
        return true;
    }
    return false;
};

export function rectRectCollision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {

  if (r1x + r1w >= r2x &&
    r1x <= r2x + r2w &&
    r1y + r1h >= r2y &&
    r1y <= r2y + r2h) {
    return true;
  };

  return false;
};