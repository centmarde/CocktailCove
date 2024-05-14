import { supabase,successNotification, errorNotification } from "../main";

const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
    e.preventDefault();

    //disable submit button
    document.querySelector("#form_login button").disabled = true;
    document.querySelector("#form_login button").innerHTML = '<div class = "spinner-border me-2" role="status"></div><span class="button-reload">Loading...</span>';


    //get all values 
    const formData = new FormData(form_login);

    //supabase login
    let { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    let session = data.session;
    let user = data.user;

    // console.log(session);

    //if user can be accessed; or user is already verified
    if (session != null) {
        // Store tokens for API
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("refresh_token", session.refresh_token);

        // Save user id in local storage
        localStorage.setItem("auth_id", user?.id);

        // Fetch user profiles
        let { data: profiles, error } = await supabase
            .from("user_info")
            .select("*")
            .eq("user_id", localStorage.getItem("auth_id"));

        localStorage.setItem("user_id", profiles[0].id);
        console.log(profiles[0].id);

        // Redirect to home page after successful login
        successNotification("Login Successfully", 10);
        window.location.pathname = '/collection.html';

       
    }
    

    if(error == null){
        successNotification("Login Successfully!",20);
        //redirect 
       /*  window.location.pathname = '/collection.html'; */
    } else {
        errorNotification("Incorrect Password!",10);
        console.log(error);
    }

    form_login.reset();

    //enable submit button
    document.querySelector("#form_login button").disabled = false;
    document.querySelector("#form_login button").innerHTML = 'Login';
    
    
    // alert("Login Successfully!")

   
}
