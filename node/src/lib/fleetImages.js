/** Photos that actually depict the named fleet models (Wikimedia Commons). */
export const FLEET_PHOTOS = {
  yukonXl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/2021_GMC_Yukon_XL_SLT%2C_front_9.24.20.jpg/1280px-2021_GMC_Yukon_XL_SLT%2C_front_9.24.20.jpg',
  yukonDenali:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/GMC_Yukon_Denali_%28GMTT1XX%29_Washington_DC_Metro_Area%2C_USA.jpg/1280px-GMC_Yukon_Denali_%28GMTT1XX%29_Washington_DC_Metro_Area%2C_USA.jpg',
  escalade:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2021_Cadillac_Escalade_Premium_Luxury%2C_front_3.7.22.jpg/1280px-2021_Cadillac_Escalade_Premium_Luxury%2C_front_3.7.22.jpg',
};

const RULES = [
  { test: /yukon\s*xl/i, url: FLEET_PHOTOS.yukonXl },
  { test: /yukon\s*denali/i, url: FLEET_PHOTOS.yukonDenali },
  { test: /escalade/i, url: FLEET_PHOTOS.escalade },
];

const MISLEADING_PHOTO_IDS = [
  'photo-1519641471654',
  'photo-1533473359331',
  'photo-1563720223185',
];

export function fleetImageFor(name, image) {
  const rule = RULES.find((entry) => entry.test.test(name || ''));
  const src = typeof image === 'string' ? image.trim() : '';
  if (!rule) return src || null;
  if (!src || MISLEADING_PHOTO_IDS.some((id) => src.includes(id))) return rule.url;
  return src;
}

export function repairFleetList(fleet) {
  if (!Array.isArray(fleet)) return { fleet, changed: false };
  let changed = false;
  const next = fleet.map((vehicle) => {
    if (!vehicle || typeof vehicle !== 'object') return vehicle;
    const image = fleetImageFor(vehicle.name, vehicle.image);
    if ((image || '') !== (vehicle.image || '')) {
      changed = true;
      return { ...vehicle, image: image || '' };
    }
    return vehicle;
  });
  return { fleet: next, changed };
}
