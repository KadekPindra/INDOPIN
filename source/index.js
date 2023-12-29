
function searchMovie () {

    $('#movie-list').html('')
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '7591cf35',
            's': $('#search-input').val(),
        },
        success: function (result) {
            console.log(result);
            if (result.Response == "True") {

                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="border-2 flex flex-col rounded-md shadow-lg shadow-slate-800 m-5 h-fit">
                        <div class="h-[600px]">
                            <img src="`+ data.Poster +`" alt="poster" class="w-full rounded-md h-[600px]">
                        </div>
                        <div class="w-full flex justify-center mt-5 -mb-4">
                            <hr class="w-4/5 border-[1px] bg-slate-700">
                        </div>
                        <div class="w-full flex flex-col justify-center text-center items-center p-5">
                            <h3 class="text-3xl">`+ data.Title +`</h3>
                            <p class=" opacity-80">`+ data.Year +`</p>
                            <button onclick="showdetail()" class="w-fit h-fit py-2 px-10 border bg-slate-900 mt-7 rounded-lg text-xl text-white text-center font-semibold" id="detail-btn" data-id="`+ data.imdbID +`">see detail</button>
                        </div>
                    </div>
                    `)
                });

                $('#search-input').val('');

            } else {
                $('#movie-list').html('<div class="flex w-full h-full justify-center items-center col-span-3"><h1 class="text-2xl text-center">Movie not Found! Please enter corect movie tittle</h1></div>')
            }
        }
    });

}

$('#search-btn').on('click', function () {
    
    searchMovie();

});

$('#search-input').on('keyup', function (e) {
    if(e.keyCode == 13 ) {
        searchMovie();
    }
})

function showdetail() {
    let detail = document.getElementById("detail");
    detail.classList.remove("hidden");
    detail.classList.add("flex");
    setTimeout(() => {
        detail.classList.add("opacity-100");
    }, 20);
}

function hidedetail() {
    let detail = document.getElementById("detail");
    detail.classList.add("opacity-0");
    detail.classList.remove("opacity-100");
    setTimeout(() => {
        detail.classList.add("hidden");
        detail.classList.remove("flex");  
    }, 400);
}


$('#movie-list').on('click', '#detail-btn', function () {
    console.log($(this).data('id'));

    $.ajax ({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '7591cf35',
            'i': $(this).data('id'),
        },

        success : function (movie) {
            if (movie.Response == "True") {

                $('#detail').html(`
                <div class="bg-white shadow-md w-1/2 h-[500px] p-2 transition-opacity duration-500">
                    <div class=" w-full h-full flex justify-center items-center">
                        <div class="bg-slate-400 w-full h-full flex justify-center items-center">
                            <img src="`+ movie.Poster +`" alt="poster">
                        </div>
                        <div class="bg-slate-300 w-full h-full overflow-y-scroll p-5">
                            <div class="flex items-center"><h1 class="text-2xl font-bold tracking-wider">`+ movie.Title +`</h1><p class="mx-2">-</p><h2 class="text-lg opacity-80">`+ movie.Runtime +`</h2></div>

                            <div class="flex items-center"><p class="opacity-70 font-medium">`+ movie.Released +`</p><p class="mx-2">-</p><p class="opacity-70 font-medium">`+ movie.Country +`</p></div>

                            <p class="text-xl font-medium tracking-wide">`+ movie.Genre +`</p>

                            <p class=" text-base font-medium tracking-wider my-10">`+ movie.Plot +`</p>

                            <div class="flex my-1 text-xl"><p class="w-20">Director</p><p class="ml-5">: `+ movie.Director +`</p></div>

                            <div class="flex my-1 text-xl"><p class="w-20">Writer</p><p class="ml-5">: `+ movie.Writer +`</p></div>

                            <div class="flex my-1 text-xl"><p class="w-20">Actors</p><p class="ml-5">: `+ movie.Actors +`</p></div>

                            <div class="w-full flex justify-center items-center my-10 "><button class="bg-slate-900 px-10 py-2 text-white rounded-md text-center" onclick="hidedetail()">back to the movie list</button></div>
                        </div>
                    </div>
                </div>
                `)

            }
        },

    });

})