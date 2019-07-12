																
																
																
																
SELECT 																
 last_day(purchaseDate) AS Month_end_date																
	,dateadd(day, cast(6 - date_part(dow,date_trunc('day',purchaseDate)) AS integer),date_trunc('day',purchaseDate)) AS Week_end_date										
	,purchaseDate as purchase_date															
	,return_date_local as	return_date														
	,content_type_named											 		AS Content_Type		
	,is_hd															
	,sum(units)										 					AS Units
	,sum(Revenue)                                    					AS Revenue										
	,sum(Sales_Discount)                    					        AS Sales_Discount										
	,sum(Refund_Revenue) 					                            AS Refund_Revenue										
	,sum(Refund_Discount)                           					AS Refund_Discount										
	,sum(Revenue - Sales_Discount - Refund_Revenue - Refund_Discount)	AS Net_Revenue														
	,sum(COGS)                                       					AS COGS										
	,sum(Return_Cost)                                					AS Return_Cost										
	,sum(COGS - Return_Cost)                         					AS Net_COGS										
	,Cost_Flag															
	,Has_Display_Price															
	,Cooper_Flag															
	,is_NR															
	,contract_id															
	,transaction_id															
	,encrypted_customer_id															
	,asin															
	,season_or_movie_name															
	,title_name															
	,season_number															
	episode_number															
																
FROM																
        (SELECT 																
         date_trunc('d',fulfill_date_local) as purchaseDate															
         	,av.transaction_id															
         	,av.asin															
         	,is_hd															
         	,case when content_type='TV Episode' and is_rental='N' then 'TV Episode EST'															
               when content_type='TV Episode' and is_rental='Y' then 'TV Episode VOD'																
               when content_type='TV Season' and is_rental='N' then 'TV Season EST'																
               when content_type='TV Season' and is_rental='Y' then 'TV Season VOD'																
               when content_type='Movie' and is_rental='N' then 'Movie EST'																
               else 'Movie VOD' end as content_type_named																
         	,count(transaction_id) as Units															
         	,SUM(case when content_type_id not in (2) then display_price_wo_tax															
   		  	   when (content_type_id=2 and fulfill_date_local < TO_DATE ('2017/01/01','YYYY/MM/DD')) then display_price_wo_tax												
   			   when (content_type_id=2 and fulfill_date_local >= TO_DATE ('2017/01/01','YYYY/MM/DD') and digital_condition_desc not in ('ORDER_CLOSED')) then display_price_wo_tax												
   			   when (content_type_id=2 and fulfill_date_local >= TO_DATE ('2017/01/01','YYYY/MM/DD') and digital_condition_desc in ('ORDER_CLOSED')) then												
              		(nvl(actual_price_wo_tax,0)+total_discount_amount) 													
   			   else display_price_wo_tax end) as Revenue 													
         	,SUM(total_discount_amount) as Sales_Discount															
         	,SUM(refund_amount_wo_tax) as Refund_Revenue  															
         	,case when nvl(return_id,0) = 0 then '0' else SUM(return_discount_amount) end as Refund_Discount  														
         	,SUM(nvl(vendor_cost,0)) as COGS														
         	,case when nvl(return_id,0) = 0 then '0' else SUM(vendor_cost_refunded) end as Return_cost  														
         	,case when nvl(vendor_cost,0) = 0 then 'Zero Cost' 														
               when (nvl(vendor_cost,0) = 0 and ((nvl(actual_price_wo_tax,0)+total_discount_amount)=0)) then 'Zero Cost' else 'Costed' end as Cost_Flag														
         	,case when display_price_wo_tax > 0 then 1 else 0 end as Has_Display_Price															
         	,case when co.contract_program_code = 'avdp' then 'Cooper' else 'TVOD' end as Cooper_Flag															
         	,case when fulfill_date_local between preorder_release_date_local and preorder_release_date_local+60 then 'NR'															
               when fulfill_date_local between preorder_release_date_local+61 and preorder_release_date_local+365 then 'Recent'																
               else 'CAT' end as is_NR																
         	,av.contract_id															
         	,encrypted_customer_id															
         	,season_or_movie_name															
         	,title_name															
         	,season_number															
        	,episode_number															
        	,av.return_date_local															
         																
        FROM																
        dvbi_core.fact_dv_transactions av																
        JOIN dvbi_core.dim1_dv_catalog_asins fa on av.asin = fa.asin and fa.marketplace_id = av.marketplace_id 																
        LEFT JOIN dvbi_core.dim2_dv_catalog_offers co on av.asin = co.asin and av.marketplace_id = co.marketplace_id 																
        AND co.entitlement_type_code in ('RENTAL','PURCHASE')															
        AND transaction_date_local >= co.effective_start_date_local and transaction_date_local < nvl(co.effective_end_date_local, sysdate)															
																
																
        WHERE 																
        encrypted_customer_id NOT IN (SELECT encrypted_customer_id FROM dvbi_core.dim1_dv_customers where is_tester = 'Y') 																
        AND av.contract_id <> 'UXVP1'																
        AND purchase_channel_desc NOT IN ('DISCPLUS') 																
        AND fulfill_date_local >= TO_DATE('2017/01/01','YYYY/MM/DD')															
        AND av.transaction_date_local >= TO_DATE('2017/01/01','YYYY/MM/DD')															
        --AND date_trunc('day'	 fulfill_date_local) between to_date('20190201'	'YYYYMMDD') -00 AND to_date('20190228'	'YYYYMMDD')													
        AND av.marketplace_id = 6																
        ANd av.digital_condition_code in ('4') --updated to include only closed transaactions 4/11/19 ancourt 																
        --AND av.ASIN IN ('B073ZC5B9P'	'B077KFM492'	'B077KN4CTK'	 'B0783HV6RB')													
        AND av.encrypted_customer_id IN ('A3OY6D37WG7LRS')																
																
																
        GROUP BY 																
        date_trunc('d',fulfill_date_local) 															
        	,av.transaction_id															
        	,av.asin															
        	,is_hd															
        	,case when content_type='TV Episode' and is_rental='N' then 'TV Episode EST'															
              when content_type='TV Episode' and is_rental='Y' then 'TV Episode VOD'																
              when content_type='TV Season' and is_rental='N' then 'TV Season EST'																
              when content_type='TV Season' and is_rental='Y' then 'TV Season VOD'																
              when content_type='Movie' and is_rental='N' then 'Movie EST'																
              else 'Movie VOD' end																
        	,av.return_id															
        	,case when nvl(vendor_cost,0) = 0 then 'Zero Cost' 														
              when (nvl(vendor_cost,0) = 0 AND ((nvl(actual_price_wo_tax,0)+total_discount_amount)=0)) then 'Zero Cost' else 'Costed' end														
        	,case when display_price_wo_tax > 0 then 1 else 0 end 															
        	,case when contract_program_code = 'avdp' then 'Cooper' else 'TVOD' end 															
        	,case when fulfill_date_local between preorder_release_date_local and preorder_release_date_local+60 then 'NR'															
              when fulfill_date_local between preorder_release_date_local+61 and preorder_release_date_local+365 then 'Recent'																
              else 'CAT' end																
        	,av.contract_id															
        	,av.encrypted_customer_id															
        	,fa.season_or_movie_name															
        	,fa.title_name															
        	,fa.season_number															
        	,fa.episode_number															
         	,av.return_date_local															
        )	as	temp														
   																
GROUP BY                             																
last_day(purchaseDate)																
	,dateadd(day,cast(6 - date_part(dow,date_trunc('day',purchaseDate)) as integer),date_trunc('day',purchaseDate))   										
	,purchase_date															
	,return_date                              															
	,content_type_named															
	,is_hd															
	,Cost_Flag															
	,Has_Display_Price															
	,Cooper_Flag															
	,is_NR															
	,contract_id															
	,transaction_id															
	,encrypted_customer_id															
	,asin															
	,season_or_movie_name															
	,title_name															
	,season_number															
	,episode_number															
