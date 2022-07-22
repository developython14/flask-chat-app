
from cryptography.fernet import Fernet

key = Fernet.generate_key()
f = Fernet(key)


mus = b'allo'


encrypted_data = f.encrypt(mus)
decrypted_data = f.decrypt(encrypted_data)
print(encrypted_data)
print(decrypted_data)