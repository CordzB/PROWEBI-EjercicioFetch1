
const API_URL = "https://api.escuelajs.co/api/v1/users";


async function obtenerUsuarios() {
    try {
        const API_URL = "https://api.escuelajs.co/api/v1/users";
        const respuesta = await fetch(API_URL);
        const usuarios = await respuesta.json();

        const contenedor = document.getElementById("user-list");
        contenedor.innerHTML = ""; 

        usuarios.forEach((usuario, index) => {
            let avatarURL = usuario.avatar;

            // Si el avatar está vacío o es incorrecto, usamos una imagen genérica
            if (!avatarURL || avatarURL.trim() === "" || !avatarURL.startsWith("http")) {
                avatarURL = "https://via.placeholder.com/150"; // Imagen por defecto
            }

            // Si la API devuelve la imagen "https://picsum.photos/800", generamos una aleatoria única. esta opcion la busque porque no me gustaba que se repitiera
            if (avatarURL === "https://picsum.photos/800") {
                avatarURL = `https://picsum.photos/800?random=${index + 1}`;
            }

            const usuarioHTML = `
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card mb-4 shadow-sm">
                        <img src="${avatarURL}" class="card-img-top" alt="Avatar de ${usuario.name}" 
                            onerror="this.src='https://via.placeholder.com/150';">
                        <div class="card-body">
                            <h5 class="card-title">${usuario.name}</h5>
                            <p class="card-text"><strong>Email:</strong> ${usuario.email}</p>
                            <p class="card-text"><strong>Password:</strong> ${usuario.password}</p>
                            <button class="btn btn-outline-primary btn-sm">Ver perfil</button>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += usuarioHTML;
        });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}


document.addEventListener("DOMContentLoaded", obtenerUsuarios);

