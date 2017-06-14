/**
 * Created by rishabh on 04-06-2017.
 */
angular.module('starter.services',[])
  .service('WC', function(){
    return {
      WC: function(){
        var Woocommerce = new WooCommerceAPI.WooCommerceAPI({
          url: 'http://localhost/wordpress-vue/',
          consumerKey: 'ck_a2ef07db24f47209f6b7c5098121273a1159f113',
          consumerSecret: 'cs_f7a1f89f54f70d1ad7370189f1f21b6283e23de0'
        });
        return Woocommerce;
      }
    }});
