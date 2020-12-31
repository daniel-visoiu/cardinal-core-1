const EVENTS = {
  GET_ROUTING: 'getRouting'
}

export default (() => {
  const placeholder = 'cardinal:config:';
  const events = EVENTS;
  for (const key of Object.keys(events)) {
    if (key !== placeholder) {
      events[key] = placeholder + events[key];
    }
  }
  return events;
})();
