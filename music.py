# from winsound import Beep
# from msvcrt import getch
import os 
import sys, tty, termios

def getch(char_width=2):
    '''get a fixed number of typed characters from the terminal. 
    Linux / Mac only'''
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
        tty.setraw(fd)
        ch = sys.stdin.read(char_width)
        if ch == "sh" or ch[0] == "#":
            ch += sys.stdin.read(1)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
    return ch

# 半音のズレが何倍か定義
onestep_pitch = 2 ** (1.0/12.0)
# 音を鳴らす時間をミリ秒で定義
bpm = 120
duration = int((60000 / bpm) / 2)

# 音を鳴らす関数を定義
def play_pitch(frequency, duration):
    os.system('play -n synth %s sin %s' % (duration/1000, frequency))
    # Beep(frequency, duration)
# 半音上げ下げする関数を定義
def down_pitch(base_pitch):
    return int(round(base_pitch / onestep_pitch))
def up_pitch(base_pitch):
    return int(round(base_pitch * onestep_pitch))

# 各音程の周波数を定義
A4 = 440
Ais4 = up_pitch(A4)
H4 = up_pitch(Ais4)
C5 = up_pitch(H4)
Cis5 = up_pitch(C5)
D5 = up_pitch(Cis5)
Dis5 = up_pitch(D5)
E5 = up_pitch(Dis5)
F5 = up_pitch(E5)
Fis5 = up_pitch(F5)
G5 = up_pitch(Fis5)
Gis5 = up_pitch(G5)
A5 = up_pitch(Gis5)

Gis4 = down_pitch(A4)
G4 = down_pitch(Gis4)
# Fis4 = down_pitch(G4)
# F4 = down_pitch(Fis4)
# E4 = down_pitch(F4)
# Dis4 = down_pitch(E4)
# D4 = down_pitch(Dis4)
# Cis4 = down_pitch(D4)
# C4 = down_pitch(Cis4)
# H3 = down_pitch(C4)
# Ais3 = down_pitch(H3)
# A3 = down_pitch(Ais3)

# キーボードと音程を関連づける。キーボードの"d"がC4、つまりドの音など
pitchs = {}
# pitchs["a"] = A3
# pitchs["w"] = Ais3
# pitchs["s"] = H3
# pitchs["do"] = C4
# pitchs["DO"] = Cis4
# pitchs["re"] = D4
# pitchs["RE"] = Dis4
# pitchs["mi"] = E4
# pitchs["fa"] = F4
# pitchs["FA"] = Fis4
pitchs["so"] = G4
pitchs["#so"] = Gis4
# ---------start------------- #
pitchs["ra"] = A4
pitchs["#ra"] = Ais4
pitchs["shi"] = H4
pitchs["do"] = C5
pitchs["#do"] = Cis5
pitchs["re"] = D5
pitchs["#re"] = Dis5
pitchs["mi"] = E5
pitchs["fa"] = F5
pitchs["#fa"] = Fis5
pitchs["SO"] = G5
pitchs["#SO"] = Gis5
pitchs["RA"] = A5

while True:
    # 入力されたキーを認識する
    pitch = getch()
    # バイト列から文字列に変換する
    # print(bytes_keyboard)
    # str_keyboard = bytes_keyboard.decode("utf-8")
    # 文字列を小文字に揃える
    # pitch = bytes_keyboard.lower()
    print("音階", pitch)
    # 押したキーが辞書の中に存在するとき、音を鳴らす
    if pitch in pitchs:
        play_pitch(pitchs[pitch], duration)
    # 終了させるときはqを押す
    elif pitch == 'QQ' or pitch == 'qq':
        break
