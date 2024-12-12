export type DTO<T> = {
  [K in keyof T]: T[K] extends (infer U)[] ? DTO<U>[] : DTO<T[K]>;
};

export function mapJsonToDto<T>(json: any): DTO<T> {
  const dto: any = {};

  for (const key in json) {
    if (Array.isArray(json[key])) {
      dto[key] = json[key].map((item: any) => mapJsonToDto(item));
    } else if (typeof json[key] === 'object' && json[key] !== null) {
      dto[key] = mapJsonToDto(json[key]);
    } else {
      dto[key] = json[key];
    }
  }

  return dto;
}
