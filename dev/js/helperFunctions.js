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

export function rectRectCollision(rect1,rect2) {

  if (rect1.x + rect1.width >= rect2.x &&
    rect1.x <= rect2.x + rect2.width &&
    rect1.y + rect1.height >= rect2.y &&
    rect1.y <= rect2.y + rect2.height) {
    return true;
  };

  return false;
};

export function pointRectCollision(point, target) {
  if (point.x >= target.x && 
    point.x <= target.x + target.width &&  
    point.y >= target.y &&       
    point.y <= target.y + target.height) {
    return true;
  }

  return false;
};