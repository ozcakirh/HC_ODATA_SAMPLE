
const urloData = "http://localhost:60398/Products"

var ButonServisCagir = document.getElementById("dvButon");

ButonServisCagir.addEventListener("click", function()
{
//alert("Tiklandi");
UrunListele(); 
});

var ButonKaydet = document.getElementById("btnEkle");

ButonKaydet.addEventListener("click", function() 
{
// Urun Ekleme İşlemleri
    //alert("Ekle");
/*
    let YeniUrun = {
        Name: document.getElementById("txtUrunAdi").value || "Ürün Adı Yok",
        Price:document.getElementById("txtUrunFiat").value || 0,
        Category:document.getElementById("txtUrunKateGori").value || "Hiç"

    };
*/
    let YeniurunA =
    {
        "@odata.context": "http://localhost:60398/$metadata#Products/$entity",
        "Id": 3,
        "Name": "Postman",
        "Price": 350,
        "Category": "Test"
    };

    console.log(YeniurunA);
    debugger
    //fetch("http://localhost:60398/products", {
        fetch("http://localhost:60398/$metadata#Products/$entity",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(YeniurunA)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
    })

    Mesajlar("Kayıt Ekleme","Kayıt Edildi");
});


const Get_oData = (KeyId) =>
{
    //let Cagir = "http://localhost:60398/products"; //`$urloData`
    let Cagir = "http://localhost:60398/products"+"("+KeyId+")"; //`$urloData`

    console.log("istenen Ürün id" , KeyId)

    fetch(Cagir).then(xData => {
        console.log(Cagir)
        console.log("xData")
        console.log(xData);
        return xData.json()
    })
    .then(Goster)

}

const Goster = (GelenVeri) =>
{
    console.log(GelenVeri);

    document.getElementById("yazUrunAdi").innerHTML = GelenVeri.Name;

    document.getElementById("yazUcreti").innerHTML = GelenVeri.Price;
}

function UrunListele()
{
    try{
        var urunNo = document.getElementById("txtUrun");

        Get_oData(urunNo.value);
        alert("Urun Listesi İstendi" );
        Mesajlar("Urun","Ürünler Listelendi");
    }
    catch(e)
    {
    alert(e);
    }

   
}

function Mesajlar(MesajBaslik, MesajIcerik)
{
    if (!window.Notification)
    {
        alert(MesajIcerik);

        return;

    }

    Notification
    .requestPermission()
    .then(MesajYaz(Notification.Permissions, MesajBaslik,MesajIcerik ))
}

function MesajYaz(Permissions, MesajBaslik,MesajIcerik)
{
    console.log(Permissions)
    console.log(MesajBaslik)
    console.log(MesajIcerik)


    debugger;
    let mesaj = new Notification(MesajBaslik, {body:MesajIcerik} );


}

