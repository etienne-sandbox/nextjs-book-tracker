export function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

export function unauthorized(res) {
  return res
    .status(401)
    .json({ status: 401, message: "Unauthorized", error: "unauthorized" });
}
