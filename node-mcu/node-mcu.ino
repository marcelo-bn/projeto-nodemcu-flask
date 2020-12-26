#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <vector>
#include <string>

// LEDs
int led_wifi = D0;

// Tempo para requisição do acionamento da bomba
unsigned int delay_bomba = 10000; // milissegundos

// Pinos dos conjuntos 
int pin_temp_1 = D1;
int pin_umi_1 = D2;
int pin_bomba_1 = D3;
int pin_botao_1 = D4;
int state_botao_1 = LOW;
int pin_temp_2 = D5;
int pin_umi_2 = D6;
int pin_bomba_2 = D7;
int pin_botao_2 = D8;
int state_botao_2 = LOW;

// Configurações WiFi
char* ssid = "XX";
char* password = "XX";
char* url_post = "http://0.0.0.0:3001/informacao";
char* url_get = "http://0.0.0.0:3001/bomba";
boolean wifiConnected = false;

void setup() {
  
  Serial.begin(115200);

  // Pinos
  //pinMode(led_wifi, OUTPUT);
  //digitalWrite(led_wifi, LOW);
  
  // Inicializando conexexão WiFi
  WiFi.begin(ssid,password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  wifiConnected = true;
  //digitalWrite(led_wifi, HIGH);
  Serial.println();
  Serial.println("Wifi conectado!");
  Serial.print("NodeMCU IP Address : ");
  Serial.println(WiFi.localIP() );
  Serial.print("Nome da rede: ");
  Serial.println(ssid);

  
}

void loop() {
  // Verifica quais conjuntos estão acionados
  state_botao_1 = HIGH;//digitalRead(pin_botao_1);
  state_botao_2 = HIGH;//digitalRead(pin_botao_2);

  // Leitura sensores
  unsigned int temp_1 = 30; // digitalRead(pin_temp_1)
  unsigned int umi_1 = 60; // digitalRead(pin_umi_1)
  unsigned int temp_2 = 20; // digitalRead(pin_temp_2)
  unsigned int umi_2 = 50; // digitalRead(pin_umi_2)

  if (state_botao_1 == HIGH and state_botao_2 == HIGH) {
    post_informacao(temp_1,umi_1,1) ;
    delay(5000);
    post_informacao(temp_2,umi_2,2);
  } 
  else if (state_botao_1 == HIGH and state_botao_2 == LOW) {
   post_informacao(temp_1,umi_1,2);
  }
  else if (state_botao_1 == LOW and state_botao_2 == HIGH) {
   post_informacao(temp_2,umi_2,2);
  }

  // Requisição GET para obter quais bombas devem ser ligadas
  //get_bomba(); // Retornar vetor v = [0,0], [0,1], [1,0], [1,1]
  //liga_bomba()
  delay(delay_bomba);
  
}

bool post_informacao(unsigned int temperatura, unsigned int umidade, unsigned int conjunto) {
  /*Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.println(" %");*/

  String response;
  int httpCode;
  String informacao = "{\"idConjunto\": \"" + String(conjunto) + "\",\"temperatura\": \"" + String(temperatura) + "\",\"umidade\": \"" + String(umidade) + "\"}";
  if (WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(url_post);
    http.addHeader("Content-Type", "application/json");
    httpCode = http.POST(informacao);
    payload = http.getString();
  }
  Serial.print("Payload:");
  Serial.println(response);
  Serial.print("httpCode:");
  Serial.println(httpCode);

  return 1;

}

//std::vector<int> get_bomba() {}
