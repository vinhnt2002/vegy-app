

    import {VietQR} from 'vietqr';

    let vietQR = new VietQR({
        clientID: '9a62ac6e-3679-49c5-9f29-9fb8ef1532dd',
        apiKey: 'dd112b41-be2e-4046-8ba4-96fa048800c0',
    });

    // list banks are supported create QR code by Vietqr
    vietQR.getBanks().then((banks)=>{
        console.log(banks);
    }).catch((err)=>{});