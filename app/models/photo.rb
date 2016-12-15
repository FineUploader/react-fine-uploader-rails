class Photo < ApplicationRecord
  mount_uploader :attachment, AttachmentUploader

  def self.combine_photos(photos)
    # =>  Convert carrierwave attachment to file
    files = photos.map{|p| p.attachment.file.to_file}
    orginal_filename = photos.first.name

    # => Create new file
    new_file = File.open(orginal_filename, 'w')

    # => Save information from parted files to new one
    files.each do |file|
      text = File.open(file, 'r').read
      text.each_line do |line|
        new_file << line.chomp + "\n"
      end
    end

    # => Create new photo object with combined file
    final_photo = Photo.new
    final_photo.name = orginal_filename
    final_photo.attachment = new_file

    # => Remove all parts of image
    photos.destroy_all

    return final_photo
  end
end
