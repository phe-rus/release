export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    return Response.json(slug);
  } catch (error) {
    console.log(error);
  }
}
