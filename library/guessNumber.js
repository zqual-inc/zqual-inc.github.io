document.addEventListener("DOMContentLoaded", function() {
    for(let i = 1; i <= 6; i++){
        document.getElementById(`table${i}`).innerHTML += print_table(i);
    }
});

function print_table(n) {
    let ans = "";
    let hidden = 0, count = 0, hi = false, row_number = 8, print_number = 0;

    for (let i = 2 ** (n - 1); i < 64; i++) {
        if (print_number == 0 && hi == false) {
            ans += "<tr>";
        } else if (print_number == 8 && hi == false) {
            ans += "</tr>";
            print_number = 0;
        }

        if (hi == false) {
            count++;
            print_number++;
            ans += '<td>' + i.toString() + '</td>';
            if (count == 2 ** (n - 1)) {
                hi = true;
                count = 0;
            }
        } else {
            hidden++;
            if (hidden == 2 ** (n - 1)) {
                hi = false;
                hidden = 0;
            }
        }
    }
    ans += "</tr>"; 
    return ans;
}

function Solution() {
    let ans = 0;

    for(let i = 0; i < 6; i++){
        if(document.getElementById(`table${i}_checkbox`).checked == true){
            ans += 2**i;
        }
    }

    console.log(ans);
    document.getElementById('Ans').innerHTML = `Ans: ${ans}`; 
}


function Solution() {
    let ans = 0;

    for (let i = 1; i <= 6; i++) { 
        if (document.getElementById(`table${i}_checkbox`).checked == true) {
            ans += 2 ** (i - 1); 
        }
    }

    console.log(ans);
    document.getElementById('Ans').innerHTML = `Ans: ${ans}`; 
}

