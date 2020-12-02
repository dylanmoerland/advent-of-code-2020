export async function readText(path: string) {
  const text = await Deno.readTextFile(path);

  return text.split('\n');
}