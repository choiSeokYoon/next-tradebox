"use server";
import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  console.log(error);
  throw new Error(error.message);
}

export async function UploadFile(formData: FormData, exchangeId: number) {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .upload(file.name, file, { upsert: true });

  if (error) {
    handleError(error);
  }


  const { data: publicUrlData } = supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .getPublicUrl(data.path);

  
  const { data: insertData, error: insertError } = await supabase
    .from('exchange_images')
    .insert({
      image_url: publicUrlData.publicUrl,
      exchange_id: exchangeId,
      created_at: new Date().toISOString(),
    });

  if (insertError) {
    handleError(insertError);
  }

  return { ...data, publicUrl: publicUrlData.publicUrl };
}