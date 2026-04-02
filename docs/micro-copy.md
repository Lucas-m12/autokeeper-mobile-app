# AutoKeeper MVP — Microcopy (pt-BR)

All user-facing strings, organized by screen. Use this as the single source of truth for localization and consistency.

---

## 1. Tab bar (global)

```
tab_home:         "Início"
tab_vehicles:     "Veículos"
tab_new:          "Novo"         (FAB accessibility label)
tab_history:      "Histórico"
tab_profile:      "Perfil"
```

---

## 2. Home screen

```
home_greeting:              "Olá, {name}"
home_title:                 "Meus veículos"
home_section_reminders:     "Lembretes ativos"
home_empty_title:           "Nenhum veículo cadastrado"
home_empty_desc:            "Cadastre seu primeiro veículo para começar a receber lembretes de IPVA, seguro, manutenções e mais."
home_empty_cta:             "Adicionar veículo"
home_all_ok:                "Tudo em dia"
home_all_ok_desc:           "Nenhum lembrete precisa de atenção agora."
```

### Hero card

```
hero_label_overdue:         "Atrasado"
hero_label_expiring:        "Próximo vencimento"
hero_label_all_ok:          "Tudo certo"
hero_unit_days:             "dias"
hero_unit_overdue:          "dias atrás"
```

### Reminder list item

```
rem_sub_days:               "{vehicle} · {n} dias"
rem_sub_today:              "{vehicle} · Vence hoje"
rem_sub_overdue:            "{vehicle} · Vencido"
rem_sub_overdue_days:       "{vehicle} · Vencido há {n} dias"
```

### Status badges

```
badge_overdue:              "Atrasado"
badge_expiring:             "Vencendo"
badge_ok:                   "OK"
```

---

## 3. Vehicle list

```
vlist_title:                "Meus veículos"
vlist_count_single:         "1 veículo cadastrado"
vlist_count_plural:         "{n} veículos cadastrados"
vlist_add_another:          "Adicionar outro veículo"
vlist_chip_all_ok:          "Tudo em dia"
```

---

## 4. Vehicle detail

```
vdetail_title:              "Detalhes do veículo"
vdetail_section_reminders:  "Lembretes"
vdetail_delete:             "Remover veículo"
```

---

## 5. Reminder detail

```
rdetail_title:              "Lembrete"

// Status bar
rdetail_status_expiring:    "Vencendo em {n} dias"
rdetail_status_today:       "Vence hoje"
rdetail_status_overdue:     "Atrasado há {n} dias"
rdetail_status_ok:          "Em dia"
rdetail_due_date_prefix:    "Vencimento:"
rdetail_overdue_prefix:     "Venceu em"

// Info grid labels
rdetail_due_date:           "Vencimento"
rdetail_value:              "Valor"
rdetail_last_payment:       "Último pagamento"
rdetail_estimated_fine:     "Multa estimada"

// Actions
rdetail_mark_paid:          "Marcar como pago"
rdetail_mark_resolved:      "Marcar como resolvido"
rdetail_edit:               "Editar lembrete"
```

### Reminder type names

```
type_ipva:                  "IPVA {year}"
type_seguro:                "Seguro Auto"
type_licenciamento:         "Licenciamento {year}"
type_troca_oleo:            "Troca de óleo"
type_revisao:               "Revisão completa"
```

### Reminder category names

```
cat_ipva:                   "Imposto"
cat_seguro:                 "Seguro"
cat_licenciamento:          "Documento"
cat_troca_oleo:             "Manutenção"
cat_revisao:                "Manutenção"
```

---

## 6. Add vehicle flow

### Step 1 — Placa

```
addv1_title:                "Novo veículo"
addv1_heading:              "Qual a placa?"
addv1_desc:                 "Digite a placa do seu veículo. Vamos tentar buscar os dados automaticamente."
addv1_placeholder:          "ABC-1D23"
addv1_hint:                 "Formato Mercosul ou antigo"
addv1_cta:                  "Buscar veículo"
addv1_step:                 "Passo 1 de 3"
```

### Step 2 — Dados

```
addv2_title:                "Novo veículo"
addv2_found_title:          "Veículo encontrado!"
addv2_found_desc:           "Confirme os dados abaixo"
addv2_not_found:            "Preencha os dados do veículo manualmente."
addv2_label_brand:          "Marca"
addv2_label_model:          "Modelo"
addv2_label_year:           "Ano"
addv2_label_color:          "Cor"
addv2_label_mileage:        "Quilometragem atual"
addv2_label_renavam:        "Renavam"
addv2_label_renavam_hint:   "(opcional)"
addv2_placeholder_brand:    "Selecione a marca"
addv2_placeholder_model:    "Selecione o modelo"
addv2_placeholder_year:     "Ano"
addv2_placeholder_color:    "Cor"
addv2_placeholder_mileage:  "Ex: 45200"
addv2_placeholder_renavam:  "00000000000"
addv2_cta:                  "Próximo passo"
addv2_step:                 "Passo 2 de 3"
```

### Step 3 — Lembretes

```
addv3_title:                "Novo veículo"
addv3_heading:              "Seus lembretes"
addv3_desc:                 "Ative os lembretes que deseja acompanhar para o {brand} {model}."
addv3_cta:                  "Salvar veículo"
addv3_skip:                 "Pular e adicionar depois"
addv3_step:                 "Passo 3 de 3"

// Toggle items
addv3_ipva_title:           "IPVA"
addv3_ipva_desc:            "Imposto anual obrigatório"
addv3_seguro_title:         "Seguro Auto"
addv3_seguro_desc:          "Renovação da apólice"
addv3_lic_title:            "Licenciamento"
addv3_lic_desc:             "CRLV anual"
addv3_oleo_title:           "Troca de óleo"
addv3_oleo_desc:            "Manutenção preventiva"
addv3_revisao_title:        "Revisão completa"
addv3_revisao_desc:         "Revisão na concessionária"
addv3_date_label:           "Vencimento"
addv3_date_label_maint:     "Próxima troca"
addv3_date_placeholder:     "DD/MM/AAAA"
```

---

## 7. Histórico

```
hist_title:                 "Histórico"
hist_subtitle:              "Tudo que você já resolveu"
hist_stat_resolved:         "Resolvidos"
hist_stat_total:            "Total pago"
hist_stat_vehicles:         "Veículos"
hist_empty_title:           "Nenhum registro ainda"
hist_empty_desc:            "Quando você resolver um lembrete, ele aparecerá aqui com a data e o valor pago."

// Action labels (per type)
hist_action_ipva:           "Pago"
hist_action_seguro:         "Renovado"
hist_action_lic:            "Pago"
hist_action_oleo:           "Concluído"
hist_action_revisao:        "Concluído"
```

---

## 8. Profile

```
prof_section_notif:         "Notificações"
prof_push_title:            "Notificações push"
prof_push_desc:             "Alertas de vencimento e lembretes"
prof_advance_title:         "Antecedência"
prof_advance_desc:          "Quando avisar antes do vencimento"
prof_advance_value:         "{n} dias"
prof_email_title:           "E-mail de resumo"
prof_email_desc:            "Resumo semanal dos seus veículos"

prof_section_account:       "Conta"
prof_personal_title:        "Dados pessoais"
prof_personal_desc:         "Nome, celular, e-mail"
prof_password_title:        "Alterar senha"

prof_section_about:         "Sobre"
prof_terms_title:           "Termos de uso"
prof_privacy_title:         "Política de privacidade"

prof_logout:                "Sair da conta"
prof_version:               "AutoKeeper v{version}"
```

---

## 9. Modals

### Marcar como pago

```
modal_pay_title:            "Marcar como pago?"
modal_pay_desc:             "Esse lembrete será movido para o histórico."
modal_pay_cta:              "Confirmar pagamento"
modal_pay_cancel:           "Cancelar"
```

### Marcar como resolvido

```
modal_resolve_title:        "Marcar como resolvido?"
modal_resolve_desc:         "Esse lembrete será movido para o histórico."
modal_resolve_cta:          "Confirmar"
modal_resolve_cancel:       "Cancelar"
```

### Remover veículo

```
modal_delete_title:         "Remover veículo?"
modal_delete_desc:          "{brand} {model} {year} ({plate}) e todos os seus lembretes serão removidos. Essa ação não pode ser desfeita."
modal_delete_cta:           "Remover veículo"
modal_delete_cancel:        "Cancelar"
```

---

## 10. Toasts

```
toast_paid:                 "{reminder_name} marcado como pago"
toast_resolved:             "{reminder_name} resolvido"
toast_vehicle_deleted:      "Veículo removido"
toast_vehicle_created:      "Veículo cadastrado com sucesso"
toast_network_error:        "Sem conexão. Verifique sua internet."
toast_server_error:         "Algo deu errado. Tente novamente."
toast_lookup_failed:        "Busca indisponível. Preencha manualmente."
toast_session_expired:      "Sessão expirada. Faça login novamente."
toast_push_disabled:        "Notificações desativadas no sistema."
toast_max_vehicles:         "Limite de veículos atingido."
```

---

## 11. Validation errors

```
err_plate_invalid:          "Placa inválida. Use o formato ABC-1234 ou ABC1D23."
err_plate_duplicate:        "Você já tem um veículo com essa placa."
err_phone_invalid:          "Número inválido. Use DDD + 9 dígitos."
err_phone_exists:           "Esse número já está cadastrado. Faça login."
err_phone_not_found:        "Número não encontrado. Crie uma conta."
err_password_weak:          "Mínimo 8 caracteres com letras e números."
err_password_mismatch:      "As senhas não conferem."
err_otp_wrong:              "Código incorreto. Verifique e tente novamente."
err_otp_expired:            "Código expirado. Solicite um novo código."
err_name_required:          "Informe seu nome completo."
err_mileage_invalid:        "Quilometragem inválida."
err_renavam_invalid:        "Renavam deve ter 11 dígitos."
err_date_invalid:           "Data inválida. Use DD/MM/AAAA."
err_date_too_past:          "Data muito antiga. Verifique o vencimento."
err_date_too_future:        "Data muito distante. Máximo 2 anos."
err_value_invalid:          "Valor inválido."
err_brand_required:         "Selecione a marca."
err_model_required:         "Selecione o modelo."
err_year_required:          "Selecione o ano."
err_reminder_duplicate:     "Já existe um lembrete de {type} ativo para esse veículo."
```

---

## 12. Notification push messages

```
notif_alert_before_title:   "Lembrete: {reminder_name}"
notif_alert_before_body:    "{reminder_name} do seu {vehicle} vence em {n} dias."
notif_alert_today_title:    "Vence hoje!"
notif_alert_today_body:     "{reminder_name} do seu {vehicle} vence hoje."
notif_alert_overdue_title:  "Atenção: lembrete atrasado"
notif_alert_overdue_body:   "{reminder_name} do seu {vehicle} está atrasado."
```

---

## 13. Date formatting

```
date_full:                  "16 de abril, 2026"         (detail screens)
date_short:                 "16/04/2026"                (info grids)
date_month_year:            "Mar 2025"                  (last payment)
date_day_month:             "12 mar"                    (histórico items)
date_month_header:          "Março 2026"                (histórico group)
date_relative_future:       "{n} dias"                  (badge, subtitle)
date_relative_today:        "Vence hoje"
date_relative_past:         "Vencido há {n} dias"
date_relative_past_short:   "Vencido"
```

---

## 14. Color names (vehicle)

```
color_branco:       "Branco"
color_prata:        "Prata"
color_preto:        "Preto"
color_cinza:        "Cinza"
color_vermelho:     "Vermelho"
color_azul:         "Azul"
color_verde:        "Verde"
color_bege:         "Bege"
color_marrom:       "Marrom"
color_amarelo:      "Amarelo"
color_dourado:      "Dourado"
color_outro:        "Outro"
```