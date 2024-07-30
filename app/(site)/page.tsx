import { createServerSupabaseClient } from "utils/supabase/server";
import UI from "./ui";




export default async function Home() {

  const supabase = await createServerSupabaseClient()
  const {data: {session}} = await supabase.auth.getSession()

  return (
    <UI session={session}/>
  );
}
