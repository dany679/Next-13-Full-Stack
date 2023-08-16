export interface BasicIdParams {
  params: { id: string };
}
export interface BasicGetIdParams extends BasicIdParams {
  params: { id: string; search: string };
}
