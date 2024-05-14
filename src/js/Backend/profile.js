import {
    supabase,
  } from "../main";

  const userId = localStorage.getItem("user_id");
  const profileimage =
  "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/public/";

  console.log(userId);
  getDatas() ;
  async function getDatas() {
    try {
      let { data: profiles, error: userError } = await supabase
      .from("user_info")
      .select("*")
      .eq("id", userId);

      let container = "";
      let container2 = "";
      let container3 = "";

      profiles.forEach((user_info) => {
       container += `
      
       <div class="name" id="photoName">${user_info.username}</div> 
       <div class="id">${user_info.id}</div>`;

       container2 += `<div class="item">
       <i class="fa-solid fa-user"></i>
       <span id="name" onclick="edit('name')">${user_info.username}</span> <!-- Click to edit the name -->
       <div class="icon" onclick="edit('name')">
           <i class="fa-solid fa-chevron-right"></i>
       </div>
   </div>`;
        
        container3 += ` <img data-id="${
          user_info.image_path
        }" src="${profileimage + user_info.image_path}" alt="" id="photo">`;
        
      });
      document.getElementById("container1").innerHTML = container;
      document.getElementById("container2").innerHTML = container2;
      document.getElementById("profileContainer").innerHTML = container3;
    } catch (error) {
      console.error(error);
    } 
  }
  

