import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658830764852 implements MigrationInterface {
  name = 'init1658830764852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "associations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying, CONSTRAINT "PK_409f7d0389b44b03f8b0767ce0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_registry_history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "official_number" integer NOT NULL, "state_title" character varying NOT NULL, "state_reg" character varying NOT NULL, "place_of_registration" character varying NOT NULL, "flag" character varying NOT NULL, "tax_status" integer NOT NULL, "vesselId" integer, CONSTRAINT "PK_bcc9928725ada4c9f1d6b811c0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "parent_id" integer, CONSTRAINT "PK_e94a2ae15640ccf41ef092b3a22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hull_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_a6e2a058f0fcef3945bbd0aa180" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hull_material" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_bb112ea340f84e8d6ee59702c39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_media" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying NOT NULL, "link" character varying NOT NULL, "vesselId" integer, CONSTRAINT "PK_d2cc3099c3c4b902ca3f997b72b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_engines" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "location" character varying NOT NULL, "year" character varying, "hours" character varying, "model" character varying, "serial_number" character varying, "overhaul_date" character varying, "overhaul_hours" character varying, "vesselId" integer, CONSTRAINT "PK_0efbb7fdfca9a0281efdf7ddc87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_miscellaneous_history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "insurance_company" integer, "insurance_policy" integer, "captain_name" integer, "captain_license" integer, "captain_phone" integer, "captain_email" integer, "vesselId" integer, CONSTRAINT "PK_ea629e135ec30b1ccadf152715a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_unit_types" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_43f5c58ce993396cb17e177e4ac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_additional_unit_typs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "status" integer NOT NULL, "vessel_unit_types_id" integer, CONSTRAINT "PK_ff2792419c57271d039895df0c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_additional_units" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "unit_type_id" integer NOT NULL, "value" character varying NOT NULL, "year" character varying NOT NULL, "make" character varying NOT NULL, "model" character varying NOT NULL, "vessel_name" character varying NOT NULL, "state_title" character varying NOT NULL, "doc_number" integer NOT NULL, "length" integer NOT NULL, "beam" character varying NOT NULL, "engine_mage" character varying NOT NULL, "engine_model" character varying NOT NULL, "serial" character varying NOT NULL, "drive_type" character varying NOT NULL, "vesselId" integer, "vesselAdditionalUnitsTypeId" integer, "vesselUnitTypesId" integer, CONSTRAINT "PK_e919f868f40af88346cf3d9ecb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_generators" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" character varying NOT NULL, "hours" character varying NOT NULL, "voltage" character varying NOT NULL, "serial_number" character varying NOT NULL, "vesselId" integer, CONSTRAINT "PK_ed4853231bbf51cafc39135b8e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "resource_type" character varying, "company_name" character varying, "address" character varying, "city" character varying, "state" character varying, "postal_code" character varying, "country" character varying, "contact_name" character varying, "mobile_phone" character varying, "work_phone" character varying, "fax" character varying, "email" character varying, "website" character varying, "company_info" character varying, "company_logo" character varying, "is_location_info" boolean NOT NULL DEFAULT false, "premium" integer, "company_id" integer, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "company_website" character varying, "email" character varying, "company_photo" character varying, "password_strength" character varying, "password_expiration" character varying, "session_expiration" character varying, "available_for_CoBroker" boolean, "commission" character varying, "minimum_commission" character varying, "enable_colisting" boolean, "do_not_publish" boolean, "publish_enhanced" boolean, "default_disclaimer" character varying, "survey_allowance_adjust_commission" boolean, "update_boatWizard_onSale_pending_status" boolean, "documentation_fee" character varying, "registration_fee" character varying, "processing_fee" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "summary_expenses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "deposited_type" character varying NOT NULL, "reference_no" character varying NOT NULL, "deposit_by" character varying NOT NULL, "name" character varying NOT NULL, "amount" character varying NOT NULL, "deal_summary" integer, CONSTRAINT "PK_d112b5c9a101b6cae016aba441f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "summary_credit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "taxable_amount" integer NOT NULL, "deal_summary" integer, CONSTRAINT "PK_89b8145623af2a2f6c5e4e0f431" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "summary_deposit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "taxable_amount" integer NOT NULL, "deal_summary" integer, CONSTRAINT "PK_8971338643fcdc2a28ccfe9ccd1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "summary_disbursements" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "amount" integer NOT NULL, "deal_summary" integer, CONSTRAINT "PK_428869d2ac3fe4bc9701caf1345" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deal_summary" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "sales_price_additional_unit" integer, "sales_price_total" integer, "sales_price_vessel" integer, "survey_allowance" integer, "final_sales_price" integer, "tradeIn_allowance" integer, "sub_total_first" integer, "sales_tax_vessel" integer, "taxable_amount_vessel" integer, "state_tax_rate" integer, "state_tax_amount" integer, "country_tax_amount" integer, "other_tax_amount" integer, "total_vessel_tax" integer, "tax_exempt" boolean, "tax_exempt_reason" character varying, "other_tax_description" character varying, "sales_tax_additional_unit" integer, "Addtl_unit_tax_tender" integer, "Addtl_unit_tax_trailer" integer, "Addtl_unit_tax_total" integer, "registration_fee" integer, "documentation_fee" integer, "sub_total_second" integer, "finance_amount" integer, "tradeIn_dept" integer, "balance_due" integer, "notes" character varying, "contract_sales_price" integer, "seller_survey_allowance" integer, "holdback_escrow" integer, "net_proceeds" integer, "Payoff" integer, "holdback_amount" integer, "attachment" character varying, "escrow_terms" character varying, "escrow_release_date" TIMESTAMP, "escrow_agent" character varying, "bank_name" character varying, "address" character varying, "city" character varying, "state" character varying, "postal_code" character varying, "country" character varying, "phone" character varying, "fax" character varying, "payoff_amount" integer, "good_until" TIMESTAMP, "per_diem" integer, "account_number" integer, "routing_number" integer, "member_number" integer, "bank_contact_name" character varying, "bank_contact_work_phone" character varying, "bank_contact_email" character varying, "bank_contact_mobile_phone" character varying, "buyer_use_alt_mailing" boolean, "payoff_to_company" character varying, "payoff_to_address" character varying, "payoff_to_city" character varying, "payoff_to_state" character varying, "payoff_to_postalcode" character varying, "payoff_to_country" character varying, "payoff_to_contact" character varying, "payoff_to_phone" character varying, "payoff_to_fax" character varying, "payoff_to_email" character varying, "deal_id" integer, CONSTRAINT "REL_085da275a7008a92244b446f1c" UNIQUE ("deal_id"), CONSTRAINT "PK_c40dea4f8b73da86ead9d2f07cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "commissions_deal" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "selling_price" integer NOT NULL, "calculating_method" character varying NOT NULL, "commission_percentage" integer NOT NULL, "commission_amount" integer NOT NULL, "cobrokerage_calculating_method" character varying NOT NULL, "cobrockerage_selling_comm_percent" integer NOT NULL, "cobrockerage_selling_comm_amt" integer NOT NULL, "cobrockerage_listing_comm_percent" integer NOT NULL, "cobrockerage_listing_comm_amt" integer NOT NULL, "commission_comments" character varying NOT NULL, "deal_id" integer, CONSTRAINT "REL_c9ac6062b0735bf8a8ab1b0484" UNIQUE ("deal_id"), CONSTRAINT "PK_c6663df7eac05ce24c617aa69dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_deal" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "deal_id" integer, CONSTRAINT "REL_6580d75514c706fdb093eed997" UNIQUE ("deal_id"), CONSTRAINT "PK_165c051c39440e6398a443601fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "terms_deal" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "offer_amount" integer, "currency" character varying, "deposit_amount" integer, "deposit_type" character varying, "deposit_due_days" integer, "contract_days" TIMESTAMP, "contract_acceptance" TIMESTAMP, "vessel_acceptance" TIMESTAMP, "closing_date" TIMESTAMP, "delivery_location" character varying, "saved_location" character varying, "closing_loation_name" character varying, "closing_location_address" character varying, "listing_brokerage" character varying, "selling_brokerage" character varying, "list_broker_fname" character varying, "sell_broker_fname" character varying, "list_broker_lname" character varying, "sell_broker_lname" character varying, "list_broker_email" character varying, "sell_broker_email" character varying, "attachment" character varying, "amendment" character varying, "counter_acceptance_date" TIMESTAMP, "terms" character varying, "marine_surveyor" character varying, "survey_allowance" integer, "adjust_commission" boolean, "additional_information" character varying, "completion_date" TIMESTAMP, "conditions" character varying, "rejection_date" TIMESTAMP, "reason_for_rejection" character varying, "delivery_date" TIMESTAMP, "delivery_time" character varying, "special_instructions" character varying, "financing" TIMESTAMP, "trial_run" TIMESTAMP, "marine_survey" TIMESTAMP, "mechanical_inspection" TIMESTAMP, "nonmechanical_survey" TIMESTAMP, "additional_terms" character varying, "exclusions" character varying, "deal_id" integer, CONSTRAINT "REL_80ccc613caae029be94f03d7ed" UNIQUE ("deal_id"), CONSTRAINT "PK_e4898482c7f8962921dea29be0f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trade_in_additional_unit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "unit_type_id" integer, "vessel_id" integer, "value" character varying, "year" character varying, "make" character varying, "model" character varying, "vessel_name" character varying, "hull_or_serial" character varying, "state_title" character varying, "state_reg" character varying, "doc_number" character varying, "length" integer, "beam_ft" integer, "beam_in" integer, "engine_mage" character varying, "engine_model" character varying, "serial" character varying, "drive_type" character varying, "trade_in_deal" integer, CONSTRAINT "PK_0e88c22da8c9312709f38b273b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trade_in_engine" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "vessel_id" integer, "location" character varying, "year" character varying, "model" character varying, "hours" integer, "serial_number" character varying, "overhaul_date" character varying, "overhaul_hours" integer, "trade_in_deal" integer, CONSTRAINT "PK_1cb9f6422e33f2f79049be6d0b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trade_in_generator" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "vessel_id" integer, "make" character varying, "model" character varying, "year" character varying, "hours" integer, "voltage" character varying, "serial_number" character varying, "trade_in_deal" integer, CONSTRAINT "PK_aa847e053e5319313e7b3d9e62e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trade_in_deal" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "deal_id" integer, "year" integer, "make_id" integer, "model" character varying, "length" integer, "vessel_name" character varying, "trade_value" integer, "trade_alt_text" character varying, "display_value_as" character varying, "actual_cash_value" integer, "hull_or_serial" character varying, "official_doc" character varying, "state_reg" character varying, "flag" character varying, "seller_accept_by" character varying, "delivery_location" character varying, "marine_surveyor" character varying, "marine_allowance" integer, "exclusions" character varying, "condition" character varying, "engine_make" character varying, "engine_model" character varying, "engine_cycle" character varying, "engine_type" character varying, "engine_total" integer, "drive_type" character varying, "engine_horse_power_single" integer, "engine_horse_power_combined" integer, "engine_fuel_type" character varying, "engine_propeller_type" character varying, "engine_propeller_material" character varying, "engine_joystick_control" boolean, "payoff_bank_name" character varying, "payoff_address_1" character varying, "payoff_address_2" character varying, "payoff_city" character varying, "payoff_state_province" character varying, "payoff_postal_code" character varying, "payoff_country" character varying, "payoff_phone" character varying, "payoff_fax" character varying, "payoff_amount" integer, "payoff_good_until" character varying, "payoff_routing_number" integer, "payoff_member_number" integer, "payoff_bank_contact_name" character varying, "payoff_bank_contact_work_phone" character varying, "payoff_bank_contact_email" character varying, "payoff_bank_contact_mobile" character varying, "payoff_usa_alt_mailing" integer, "payoff_spst_company" character varying, "payoff_spst_address" character varying, "payoff_spst_city" character varying, "payoff_spst_state_province" character varying, "payoff_spst_postal_code" character varying, "payoff_spst_country" character varying, "payoff_spst_contact" character varying, "payoff_spst_phone" character varying, "payoff_spst_fax" character varying, "payoff_spst_email" character varying, CONSTRAINT "PK_f760081863afb93d2e57addb410" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deal" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" integer NOT NULL, "vessel_id" integer, "deal_summary_id" integer, "commissions_id" integer, "document_deal_id" integer, "terms_deal_id" integer, "buyer_id" integer, "co_buyer_id" integer, "seller_id" integer, "co_seller_id" integer, "trade_in_deal" integer, CONSTRAINT "REL_8d582a2e656137a4311f44c2f0" UNIQUE ("deal_summary_id"), CONSTRAINT "REL_6b1cdab845e86e86e4c3cdc123" UNIQUE ("commissions_id"), CONSTRAINT "REL_2578f9934cc4937d4d6229f48c" UNIQUE ("document_deal_id"), CONSTRAINT "REL_a113b37860ede04712c34063cf" UNIQUE ("terms_deal_id"), CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_inventory" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "inventory_id" integer, CONSTRAINT "REL_1943207a801b42ef6edd4c3963" UNIQUE ("inventory_id"), CONSTRAINT "PK_6a9ec1a4bfd82f02b429b6698ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "showings_inventory_log" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "time" TIMESTAMP NOT NULL, "showing_broker" character varying NOT NULL, "client_name" character varying NOT NULL, "note" character varying, "inventory_showings_id" integer, CONSTRAINT "PK_fd479de47e2233c1906e1bca432" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "showings_inventory" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "location_name" character varying, "address" character varying, "city" character varying, "state" character varying, "postal_code" character varying, "country" character varying, "location_phone" character varying, "slip_number" character varying, "key_location" character varying, "marina_website" character varying, "map_url" character varying, "caption_name" character varying, "caption_email" character varying, "caption_phone" character varying, "instruction" character varying, "inventory_id" integer, CONSTRAINT "REL_c3fb506e36f7e4e663f544237b" UNIQUE ("inventory_id"), CONSTRAINT "PK_bf38b96b3c53b4a38f2fe29c74a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "terms_inventory" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "listing_type" character varying, "contract_date" TIMESTAMP, "contract_term_days" integer, "contract_end_date" TIMESTAMP, "co_broker_available" character varying, "listing_price" integer, "currency" character varying, "commission" character varying, "net_to_seller" integer, "min_commission" integer, "storage_fee" integer, "additional_terms" character varying, "exclusions" character varying, "material_damage" character varying, "cruising_rpm" character varying, "amendment" character varying, "broker_firstname" character varying, "broker_lastname" character varying, "broker_email" character varying, "co_listing_brokerage" character varying, "co_listing_term" character varying, "co_listing_term_note" character varying, "broker_age_type" character varying, "commission_percent_primary_broker" integer, "commission_amount_primary_broker" integer, "commission_percent_co_broker" integer, "commission_amount_co_broker" integer, "a_courts_located_checked" boolean, "a_courts_located" character varying, "b_binding_arbitration_checked" boolean, "b_binding_arbitration" character varying, "c_binding_arbitration_in_checked" boolean, "c_binding_arbitration_in" character varying, "c_i_law_of_the_state_of" character varying, "c_ii_main_office_selling_broker" character varying, "inventory_id" integer, CONSTRAINT "REL_89aadf5bd5d0bb01bd816b1162" UNIQUE ("inventory_id"), CONSTRAINT "PK_2d2c79c9528058f0a200c5d5209" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" integer, "document_in_id" integer, "showings_in_id" integer, "terms_in_id" integer, "vessel_id" integer, "seller_id" integer, "co_seller_id" integer, CONSTRAINT "REL_79f171a5ab31b3739e05e8f77b" UNIQUE ("document_in_id"), CONSTRAINT "REL_2f52fec42407fe4ad51957eca9" UNIQUE ("showings_in_id"), CONSTRAINT "REL_ee757ef14971310e3dd9378c1d" UNIQUE ("terms_in_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying, "condition" character varying, "category" character varying, "model" character varying, "year" character varying, "length" integer, "hull_no" character varying, "hull_color" character varying, "designer" character varying, "listing_title" character varying, "stock_listing" character varying, "location_name" character varying, "state_province" character varying, "address" character varying, "postal_code" character varying, "city" character varying, "country" character varying, "official_doc" character varying, "flag" character varying, "state_title" character varying, "sales_use_tax_paid" character varying, "state_reg" character varying, "halling_part" character varying, "place_of_registration" character varying, "insurance_company" character varying, "insurance_policy" character varying, "caption_name" character varying, "caption_license" character varying, "caption_phone" character varying, "caption_email" character varying, "loa_ft" integer, "loa_in" integer, "lwl_ft" integer, "lwl_in" integer, "beam_ft" integer, "beam_in" integer, "deadrise" integer, "draft_max_ft" integer, "draft_max_in" integer, "bridge_clearance_ft" integer, "bridge_clearance_in" integer, "dry_weight" integer, "draft_min_ft" integer, "draft_min_in" integer, "ballast" integer, "gross_tonnage" character varying, "displacement" character varying, "net_tonnage" character varying, "cruising_speed" integer, "max_speed" integer, "range" integer, "cruising_rpm" character varying, "max_rpm" character varying, "tank_fuel_capacity" integer, "tank_fuel_available" integer, "tank_water_capacity" integer, "tank_water_available" integer, "tank_holding" integer, "tank_holding_available" integer, "seating_capacity" integer, "total_cabins" integer, "total_sleeps" integer, "total_heads" integer, "total_berths" integer, "captain_cabin" integer, "crew_berths" integer, "crew_sleeps" integer, "cerified_europ" integer, "intl_classification" character varying, "engine_make" character varying, "engine_model" character varying, "engine_cycle" character varying, "engine_type" character varying, "engine_total" integer, "drive_type" character varying, "engine_hourse_power_single" integer, "engine_hourse_power_combined" integer, "engine_fuel_type" character varying, "engine_propeller_type" character varying, "engine_propeller_meterial" character varying, "engine_joystick_control" integer, "main_description" character varying, "other_description" character varying, "other_description_title" character varying, "other_description_category" character varying, "other_description_visibility" character varying, "features" character varying, "disclaimer" character varying, "disclaimer_category" character varying, "disclaimer_number" integer, "payoff_bank_name" character varying, "payoff_address_1" character varying, "payoff_address_2" character varying, "payoff_city" character varying, "payoff_state_province" character varying, "payoff_postal_code" character varying, "payoff_country" character varying, "payoff_phone" character varying, "payoff_fax" character varying, "payoff_amount" integer, "payoff_good_until" character varying, "payoff_routing_number" integer, "payoff_member_number" integer, "payoff_bank_contact_name" character varying, "payoff_bank_contact_work_phone" character varying, "payoff_bank_contact_email" character varying, "payoff_bank_contact_mobile" character varying, "payoff_usa_alt_mailing" integer, "payoff_spst_company" character varying, "payoff_spst_address" character varying, "payoff_spst_city" character varying, "payoff_spst_state_province" character varying, "payoff_spst_postal_code" character varying, "payoff_spst_country" character varying, "payoff_spst_contact" character varying, "payoff_spst_phone" character varying, "payoff_spst_fax" character varying, "payoff_spst_email" character varying, "hull_type" integer, "hull_material" integer, "vessel_type" integer, "sub_vessel_type" integer, "vessel_manu_facturer" integer, "company" integer, "client" integer, CONSTRAINT "PK_87cc5d99bd07c65028ddcc9c785" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vessel_manufacturer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "parent_id" integer, "name" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_b704551e8e5c16275a796ce0f55" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client_wants_vessel" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "category" integer NOT NULL, "model" character varying NOT NULL, "condition" character varying NOT NULL, "length_from" integer NOT NULL, "length_to" integer NOT NULL, "year_from" TIMESTAMP NOT NULL, "year_to" TIMESTAMP NOT NULL, "price_from" integer NOT NULL, "price_to" integer NOT NULL, "note" character varying NOT NULL, "client" integer, CONSTRAINT "PK_8dc618d0fe800ef4ae34d1e904d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client_activity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying, "date" TIMESTAMP, "time" character varying, "note" character varying, "client" integer, CONSTRAINT "PK_bdf8ab9d6d3900ad7c5fe413de5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying, "work_phone" character varying, "home_phone" character varying, "primary_phone" character varying, "fax" character varying, "address" character varying, "city" character varying, "state" character varying, "postal_code" character varying, "country" character varying, "secondary_address" character varying, "secondary_city" character varying, "secondary_state" character varying, "secondary_postal_code" character varying, "secondary_country" character varying, "citizenship" character varying, "company_or_trust" character varying, "company_or_trust_name" character varying, "signature_title" character varying, "dob" character varying, "driver_license" character varying, "passport" character varying, "social_security" character varying, "tax_no" character varying, "company_structure" character varying, "good_standing" character varying, "jurisdiction" character varying, "customer" character varying, "auther" integer, "auther_changed_from" integer, "status" integer, "owner_type" character varying, "display_name_between" character varying, "display_as" character varying, "broker_details" integer, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "REL_d8982608e032eba2242f13549c" UNIQUE ("broker_details"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_settings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "broker_details" integer, CONSTRAINT "REL_71a266ad614e0f463feffb2908" UNIQUE ("broker_details"), CONSTRAINT "PK_cede89a31d2392a1064087af67a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "broker_details" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "broker_license" character varying, "start_year_in_brokerage" TIMESTAMP, "certifications" boolean, "brokers_assistant" character varying, "client_id" integer, "user_id" integer, "account_settings" integer, CONSTRAINT "REL_e13fcf9633b7f3ca4f5fc42f54" UNIQUE ("client_id"), CONSTRAINT "REL_d2388829c7b0cd71f97762ed72" UNIQUE ("user_id"), CONSTRAINT "REL_ce667baae06c40f638d8427605" UNIQUE ("account_settings"), CONSTRAINT "PK_7c017d1f0be37149a6cc2fcdf60" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying, "last_name" character varying, "email" character varying, "password" character varying, "status" integer NOT NULL DEFAULT '1', "package" integer, "role" character varying NOT NULL, "failed_login_attempt" integer NOT NULL DEFAULT '0', "stripe_customer_id" character varying, "mobile_phone" character varying, "work_phone" character varying, "fax" character varying, "profile_picture" character varying, "about_me" character varying, "all_signing_events" boolean, "fully_executed_contracts" boolean, "insurance_quote_requests" boolean, "brokers_assistant" character varying, "default_currency" character varying, "vessel_measurement" boolean, "display_seller_ss" character varying, "display_buyer_as" character varying, "sales_id" character varying, "default_sort_order" character varying, "broker_details_id" integer, "company_id" integer, "location_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_45091912b17abd3c3bd5135171" UNIQUE ("broker_details_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comapny_location_info" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "location" character varying, "location_name" character varying, "brokerage_name" character varying, "dealer_name" character varying, "address" character varying, "state" character varying, "city" character varying, "postal_code" character varying, "country" character varying, "work_phone" character varying, "fax" character varying, "state_sales_tax" character varying, "state_dealer_lic" character varying, "tax_legal_country" character varying, "is_primary" boolean, "comapny_id" integer, CONSTRAINT "PK_f35fa28adb5a60ea93acfd1bc6f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "password_reset_token" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "expiration" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d8950eed0b32265b7841f1b746f" UNIQUE ("email"), CONSTRAINT "PK_838af121380dfe3a6330e04f5bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "addons" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "details" character varying, "price" integer, "limits" integer, "limits_set" character varying, "status" integer DEFAULT '0', "stripe_plan_id" character varying, "stripe_product_id" character varying, CONSTRAINT "PK_cd49fb3dc0558f02cb6fe6cc138" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "main_package" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "details" character varying, "price" integer, "status" integer DEFAULT '0', "stripe_plan_id" character varying, "stripe_product_id" character varying, "user_limits" integer, "vessel_limits" integer, "video_limits" integer, "image_limits" integer, CONSTRAINT "PK_6cf0a086844cd7b7be8ce248c26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription_addons" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "subscription_id" character varying NOT NULL, "addone_id" character varying, CONSTRAINT "PK_2648ce4c6031da6cfb93f33665e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "main_package" integer, "payment_type" character varying, "status" integer DEFAULT '0', CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "broker_associations" ("brokerDetailsId" integer NOT NULL, "associationsId" integer NOT NULL, CONSTRAINT "PK_ce3a31324136a5607b90a1f2c2b" PRIMARY KEY ("brokerDetailsId", "associationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_959dc3e489b724526a448ea43a" ON "broker_associations" ("brokerDetailsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_645048f3186d1fb218148f346b" ON "broker_associations" ("associationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_registry_history" ADD CONSTRAINT "FK_528a8811c31aadb1adab2f9a49c" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_media" ADD CONSTRAINT "FK_95156dcbcc2aac2d87002781a0c" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_engines" ADD CONSTRAINT "FK_a4cf834c828eb44cc1aa2314749" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_miscellaneous_history" ADD CONSTRAINT "FK_6c403abc6cb0ff4720dedb94b08" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_additional_unit_typs" ADD CONSTRAINT "FK_9333f9e321a770dd26ccc3ca212" FOREIGN KEY ("vessel_unit_types_id") REFERENCES "vessel_additional_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_additional_units" ADD CONSTRAINT "FK_975c6312e0eae59bf1f4c319495" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_additional_units" ADD CONSTRAINT "FK_c0f0b32bcea591e958a83d1df82" FOREIGN KEY ("vesselAdditionalUnitsTypeId") REFERENCES "vessel_additional_unit_typs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_additional_units" ADD CONSTRAINT "FK_d84520b7407066ad00c8f924e70" FOREIGN KEY ("vesselUnitTypesId") REFERENCES "vessel_unit_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_generators" ADD CONSTRAINT "FK_90c232e5ae2381d1b7844c35963" FOREIGN KEY ("vesselId") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resource" ADD CONSTRAINT "FK_41c69dedd05705006b71ef6ad0b" FOREIGN KEY ("premium") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resource" ADD CONSTRAINT "FK_a74ba4bc94b0ed01bb4d62e71a6" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_expenses" ADD CONSTRAINT "FK_8b1bf48c39e61ccab00eb833c70" FOREIGN KEY ("deal_summary") REFERENCES "deal_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_credit" ADD CONSTRAINT "FK_dd044a1c2516009ae22e3a17061" FOREIGN KEY ("deal_summary") REFERENCES "deal_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_deposit" ADD CONSTRAINT "FK_b447bc8a4f84eed4c12313978cf" FOREIGN KEY ("deal_summary") REFERENCES "deal_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "summary_disbursements" ADD CONSTRAINT "FK_00b8f5236a109e59ec73c780e67" FOREIGN KEY ("deal_summary") REFERENCES "deal_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal_summary" ADD CONSTRAINT "FK_085da275a7008a92244b446f1c9" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "commissions_deal" ADD CONSTRAINT "FK_c9ac6062b0735bf8a8ab1b04840" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_deal" ADD CONSTRAINT "FK_6580d75514c706fdb093eed9977" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_deal" ADD CONSTRAINT "FK_80ccc613caae029be94f03d7edd" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trade_in_additional_unit" ADD CONSTRAINT "FK_352ded937c48f2f8e544bab1557" FOREIGN KEY ("trade_in_deal") REFERENCES "trade_in_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trade_in_engine" ADD CONSTRAINT "FK_f0c6bbaa216cebaf60ee9cf9626" FOREIGN KEY ("trade_in_deal") REFERENCES "trade_in_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trade_in_generator" ADD CONSTRAINT "FK_d03bdd4ac029660676addb7aaa0" FOREIGN KEY ("trade_in_deal") REFERENCES "trade_in_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_1be3cfe257ff8a088ebfc8fb69e" FOREIGN KEY ("vessel_id") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_8d582a2e656137a4311f44c2f06" FOREIGN KEY ("deal_summary_id") REFERENCES "deal_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_6b1cdab845e86e86e4c3cdc123b" FOREIGN KEY ("commissions_id") REFERENCES "commissions_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_2578f9934cc4937d4d6229f48ca" FOREIGN KEY ("document_deal_id") REFERENCES "document_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_a113b37860ede04712c34063cf5" FOREIGN KEY ("terms_deal_id") REFERENCES "terms_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_4f9abb47a8045f369d01a3c618a" FOREIGN KEY ("buyer_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_30617c89903606da788f7d03a41" FOREIGN KEY ("co_buyer_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_65b4e9b900f67f37caf63647a09" FOREIGN KEY ("seller_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_c6f2911528b422f80eb97c4b2d3" FOREIGN KEY ("co_seller_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deal" ADD CONSTRAINT "FK_0bef67da78198bdae5d8c1557ec" FOREIGN KEY ("trade_in_deal") REFERENCES "trade_in_deal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_inventory" ADD CONSTRAINT "FK_1943207a801b42ef6edd4c3963e" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "showings_inventory_log" ADD CONSTRAINT "FK_9379502dbe35de7767e19f11c73" FOREIGN KEY ("inventory_showings_id") REFERENCES "showings_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "showings_inventory" ADD CONSTRAINT "FK_c3fb506e36f7e4e663f544237b9" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_inventory" ADD CONSTRAINT "FK_89aadf5bd5d0bb01bd816b11622" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_79f171a5ab31b3739e05e8f77b9" FOREIGN KEY ("document_in_id") REFERENCES "document_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_2f52fec42407fe4ad51957eca91" FOREIGN KEY ("showings_in_id") REFERENCES "showings_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_ee757ef14971310e3dd9378c1d6" FOREIGN KEY ("terms_in_id") REFERENCES "terms_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_8965861f18cce0aebfe2bc7a60f" FOREIGN KEY ("vessel_id") REFERENCES "vessel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_45353d6d8839a4ca47bc97678aa" FOREIGN KEY ("seller_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_6edd5bb9e8cfd4760fdaa4497c9" FOREIGN KEY ("co_seller_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_81232336746d134da9dc425cee2" FOREIGN KEY ("hull_type") REFERENCES "hull_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_e9625b6286e2db728c8ccf1f050" FOREIGN KEY ("hull_material") REFERENCES "hull_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_ce9fa88d17160f5a46760f8e39c" FOREIGN KEY ("vessel_type") REFERENCES "vessel_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_d15101f9d0b641c6d2482e5d706" FOREIGN KEY ("sub_vessel_type") REFERENCES "vessel_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_efc7b1b77e8f1cf572c01b45665" FOREIGN KEY ("vessel_manu_facturer") REFERENCES "vessel_manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_d24c0d1af8432d0314a0695025f" FOREIGN KEY ("company") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel" ADD CONSTRAINT "FK_a99182703a120c1003d2c7e860b" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_wants_vessel" ADD CONSTRAINT "FK_aaead1d56467c2b15d8f3dbc004" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_activity" ADD CONSTRAINT "FK_248bc3711f75c2ef34cdaaedb0c" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_d8982608e032eba2242f13549c3" FOREIGN KEY ("broker_details") REFERENCES "broker_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_settings" ADD CONSTRAINT "FK_71a266ad614e0f463feffb2908c" FOREIGN KEY ("broker_details") REFERENCES "broker_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "broker_details" ADD CONSTRAINT "FK_e13fcf9633b7f3ca4f5fc42f54d" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "broker_details" ADD CONSTRAINT "FK_d2388829c7b0cd71f97762ed72e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "broker_details" ADD CONSTRAINT "FK_ce667baae06c40f638d8427605d" FOREIGN KEY ("account_settings") REFERENCES "account_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_45091912b17abd3c3bd5135171b" FOREIGN KEY ("broker_details_id") REFERENCES "broker_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_37bfb01591406f0fefaed6799a0" FOREIGN KEY ("location_id") REFERENCES "comapny_location_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comapny_location_info" ADD CONSTRAINT "FK_7b9b01efa751edff9afe2807c49" FOREIGN KEY ("comapny_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "broker_associations" ADD CONSTRAINT "FK_959dc3e489b724526a448ea43aa" FOREIGN KEY ("brokerDetailsId") REFERENCES "broker_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "broker_associations" ADD CONSTRAINT "FK_645048f3186d1fb218148f346b0" FOREIGN KEY ("associationsId") REFERENCES "associations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "broker_associations" DROP CONSTRAINT "FK_645048f3186d1fb218148f346b0"`);
    await queryRunner.query(`ALTER TABLE "broker_associations" DROP CONSTRAINT "FK_959dc3e489b724526a448ea43aa"`);
    await queryRunner.query(`ALTER TABLE "comapny_location_info" DROP CONSTRAINT "FK_7b9b01efa751edff9afe2807c49"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_37bfb01591406f0fefaed6799a0"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_45091912b17abd3c3bd5135171b"`);
    await queryRunner.query(`ALTER TABLE "broker_details" DROP CONSTRAINT "FK_ce667baae06c40f638d8427605d"`);
    await queryRunner.query(`ALTER TABLE "broker_details" DROP CONSTRAINT "FK_d2388829c7b0cd71f97762ed72e"`);
    await queryRunner.query(`ALTER TABLE "broker_details" DROP CONSTRAINT "FK_e13fcf9633b7f3ca4f5fc42f54d"`);
    await queryRunner.query(`ALTER TABLE "account_settings" DROP CONSTRAINT "FK_71a266ad614e0f463feffb2908c"`);
    await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_d8982608e032eba2242f13549c3"`);
    await queryRunner.query(`ALTER TABLE "client_activity" DROP CONSTRAINT "FK_248bc3711f75c2ef34cdaaedb0c"`);
    await queryRunner.query(`ALTER TABLE "client_wants_vessel" DROP CONSTRAINT "FK_aaead1d56467c2b15d8f3dbc004"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_a99182703a120c1003d2c7e860b"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_d24c0d1af8432d0314a0695025f"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_efc7b1b77e8f1cf572c01b45665"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_d15101f9d0b641c6d2482e5d706"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_ce9fa88d17160f5a46760f8e39c"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_e9625b6286e2db728c8ccf1f050"`);
    await queryRunner.query(`ALTER TABLE "vessel" DROP CONSTRAINT "FK_81232336746d134da9dc425cee2"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_6edd5bb9e8cfd4760fdaa4497c9"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_45353d6d8839a4ca47bc97678aa"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_8965861f18cce0aebfe2bc7a60f"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_ee757ef14971310e3dd9378c1d6"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_2f52fec42407fe4ad51957eca91"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_79f171a5ab31b3739e05e8f77b9"`);
    await queryRunner.query(`ALTER TABLE "terms_inventory" DROP CONSTRAINT "FK_89aadf5bd5d0bb01bd816b11622"`);
    await queryRunner.query(`ALTER TABLE "showings_inventory" DROP CONSTRAINT "FK_c3fb506e36f7e4e663f544237b9"`);
    await queryRunner.query(`ALTER TABLE "showings_inventory_log" DROP CONSTRAINT "FK_9379502dbe35de7767e19f11c73"`);
    await queryRunner.query(`ALTER TABLE "document_inventory" DROP CONSTRAINT "FK_1943207a801b42ef6edd4c3963e"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_0bef67da78198bdae5d8c1557ec"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_c6f2911528b422f80eb97c4b2d3"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_65b4e9b900f67f37caf63647a09"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_30617c89903606da788f7d03a41"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_4f9abb47a8045f369d01a3c618a"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_a113b37860ede04712c34063cf5"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_2578f9934cc4937d4d6229f48ca"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_6b1cdab845e86e86e4c3cdc123b"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_8d582a2e656137a4311f44c2f06"`);
    await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_1be3cfe257ff8a088ebfc8fb69e"`);
    await queryRunner.query(`ALTER TABLE "trade_in_generator" DROP CONSTRAINT "FK_d03bdd4ac029660676addb7aaa0"`);
    await queryRunner.query(`ALTER TABLE "trade_in_engine" DROP CONSTRAINT "FK_f0c6bbaa216cebaf60ee9cf9626"`);
    await queryRunner.query(`ALTER TABLE "trade_in_additional_unit" DROP CONSTRAINT "FK_352ded937c48f2f8e544bab1557"`);
    await queryRunner.query(`ALTER TABLE "terms_deal" DROP CONSTRAINT "FK_80ccc613caae029be94f03d7edd"`);
    await queryRunner.query(`ALTER TABLE "document_deal" DROP CONSTRAINT "FK_6580d75514c706fdb093eed9977"`);
    await queryRunner.query(`ALTER TABLE "commissions_deal" DROP CONSTRAINT "FK_c9ac6062b0735bf8a8ab1b04840"`);
    await queryRunner.query(`ALTER TABLE "deal_summary" DROP CONSTRAINT "FK_085da275a7008a92244b446f1c9"`);
    await queryRunner.query(`ALTER TABLE "summary_disbursements" DROP CONSTRAINT "FK_00b8f5236a109e59ec73c780e67"`);
    await queryRunner.query(`ALTER TABLE "summary_deposit" DROP CONSTRAINT "FK_b447bc8a4f84eed4c12313978cf"`);
    await queryRunner.query(`ALTER TABLE "summary_credit" DROP CONSTRAINT "FK_dd044a1c2516009ae22e3a17061"`);
    await queryRunner.query(`ALTER TABLE "summary_expenses" DROP CONSTRAINT "FK_8b1bf48c39e61ccab00eb833c70"`);
    await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_a74ba4bc94b0ed01bb4d62e71a6"`);
    await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_41c69dedd05705006b71ef6ad0b"`);
    await queryRunner.query(`ALTER TABLE "vessel_generators" DROP CONSTRAINT "FK_90c232e5ae2381d1b7844c35963"`);
    await queryRunner.query(`ALTER TABLE "vessel_additional_units" DROP CONSTRAINT "FK_d84520b7407066ad00c8f924e70"`);
    await queryRunner.query(`ALTER TABLE "vessel_additional_units" DROP CONSTRAINT "FK_c0f0b32bcea591e958a83d1df82"`);
    await queryRunner.query(`ALTER TABLE "vessel_additional_units" DROP CONSTRAINT "FK_975c6312e0eae59bf1f4c319495"`);
    await queryRunner.query(
      `ALTER TABLE "vessel_additional_unit_typs" DROP CONSTRAINT "FK_9333f9e321a770dd26ccc3ca212"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vessel_miscellaneous_history" DROP CONSTRAINT "FK_6c403abc6cb0ff4720dedb94b08"`,
    );
    await queryRunner.query(`ALTER TABLE "vessel_engines" DROP CONSTRAINT "FK_a4cf834c828eb44cc1aa2314749"`);
    await queryRunner.query(`ALTER TABLE "vessel_media" DROP CONSTRAINT "FK_95156dcbcc2aac2d87002781a0c"`);
    await queryRunner.query(`ALTER TABLE "vessel_registry_history" DROP CONSTRAINT "FK_528a8811c31aadb1adab2f9a49c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_645048f3186d1fb218148f346b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_959dc3e489b724526a448ea43a"`);
    await queryRunner.query(`DROP TABLE "broker_associations"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TABLE "subscription_addons"`);
    await queryRunner.query(`DROP TABLE "main_package"`);
    await queryRunner.query(`DROP TABLE "addons"`);
    await queryRunner.query(`DROP TABLE "password_reset_token"`);
    await queryRunner.query(`DROP TABLE "comapny_location_info"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "broker_details"`);
    await queryRunner.query(`DROP TABLE "account_settings"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "client_activity"`);
    await queryRunner.query(`DROP TABLE "client_wants_vessel"`);
    await queryRunner.query(`DROP TABLE "vessel_manufacturer"`);
    await queryRunner.query(`DROP TABLE "vessel"`);
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(`DROP TABLE "terms_inventory"`);
    await queryRunner.query(`DROP TABLE "showings_inventory"`);
    await queryRunner.query(`DROP TABLE "showings_inventory_log"`);
    await queryRunner.query(`DROP TABLE "document_inventory"`);
    await queryRunner.query(`DROP TABLE "deal"`);
    await queryRunner.query(`DROP TABLE "trade_in_deal"`);
    await queryRunner.query(`DROP TABLE "trade_in_generator"`);
    await queryRunner.query(`DROP TABLE "trade_in_engine"`);
    await queryRunner.query(`DROP TABLE "trade_in_additional_unit"`);
    await queryRunner.query(`DROP TABLE "terms_deal"`);
    await queryRunner.query(`DROP TABLE "document_deal"`);
    await queryRunner.query(`DROP TABLE "commissions_deal"`);
    await queryRunner.query(`DROP TABLE "deal_summary"`);
    await queryRunner.query(`DROP TABLE "summary_disbursements"`);
    await queryRunner.query(`DROP TABLE "summary_deposit"`);
    await queryRunner.query(`DROP TABLE "summary_credit"`);
    await queryRunner.query(`DROP TABLE "summary_expenses"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "resource"`);
    await queryRunner.query(`DROP TABLE "vessel_generators"`);
    await queryRunner.query(`DROP TABLE "vessel_additional_units"`);
    await queryRunner.query(`DROP TABLE "vessel_additional_unit_typs"`);
    await queryRunner.query(`DROP TABLE "vessel_unit_types"`);
    await queryRunner.query(`DROP TABLE "vessel_miscellaneous_history"`);
    await queryRunner.query(`DROP TABLE "vessel_engines"`);
    await queryRunner.query(`DROP TABLE "vessel_media"`);
    await queryRunner.query(`DROP TABLE "hull_material"`);
    await queryRunner.query(`DROP TABLE "hull_type"`);
    await queryRunner.query(`DROP TABLE "vessel_type"`);
    await queryRunner.query(`DROP TABLE "vessel_registry_history"`);
    await queryRunner.query(`DROP TABLE "associations"`);
  }
}
