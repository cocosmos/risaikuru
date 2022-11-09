// Create a file named custom.d.ts with the following content:
declare module "*.svg" {
  const content: any;
  export default content;
}
