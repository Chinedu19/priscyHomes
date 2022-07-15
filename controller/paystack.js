const axios = require('axios')

const paystack = () => {
    const MySecretKey = `Bearer ${process.env.PAYSTACK_TEST_KEY}`;
    //sk_test_xxxx to be replaced by your own secret key
    const initializePayment = async (form, mycallback) => {
        const option = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           },
            form
        }
        const callback = (error, response, body) => {
            return mycallback(error, body);
        }
        const res = await axios({
            method: 'POST',
            url: option.url,
            data: form,
            headers: option.headers
        });
        console.log(res.data)

        return res

    }
    const verifyPayment = (ref, mycallback) => {
        const option = {
            url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body);
        }
        // request(option, callback);
    }
    return { initializePayment, verifyPayment };
}
module.exports = paystack